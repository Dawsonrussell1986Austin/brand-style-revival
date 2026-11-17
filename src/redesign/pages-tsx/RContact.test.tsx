import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import RContact, { SCHOOL_WALKTHROUGH_TOPIC } from "./RContact";

const mocks = vi.hoisted(() => ({
  insert: vi.fn(),
  invoke: vi.fn(),
  navigate: vi.fn(),
  walkthroughOptionLabel: null as string | null,
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => ({ insert: mocks.insert })),
    functions: { invoke: mocks.invoke },
  },
}));

vi.mock("@/hooks/useSiteContent", () => ({
  useContent: (_page: string, _section: string, key: string, fallback: string) => ({
    content: key === "school_walkthrough_option" ? mocks.walkthroughOptionLabel ?? fallback : fallback,
    isLoading: false,
  }),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => mocks.navigate };
});

vi.mock("../RedesignLayout", () => ({
  RedesignLayout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("@/components/SEO", () => ({ SEO: () => null }));
vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

function renderContact(path = "/contact?interest=school-walkthrough") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <RContact />
    </MemoryRouter>,
  );
}

function fillValidForm() {
  fireEvent.change(screen.getByLabelText("First name"), { target: { value: "Test" } });
  fireEvent.change(screen.getByLabelText("Last name"), { target: { value: "Educator" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.org" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Please show us the tools." } });
}

beforeEach(() => {
  mocks.insert.mockReset();
  mocks.invoke.mockReset();
  mocks.navigate.mockReset();
  mocks.walkthroughOptionLabel = null;
  mocks.insert.mockResolvedValue({ error: null });
  mocks.invoke.mockResolvedValue({ data: { ok: true }, error: null });
  window.gtag = vi.fn();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("school walkthrough contact requests", () => {
  it("preselects the walkthrough inquiry on a direct visit and preserves every inquiry choice", () => {
    renderContact();
    const select = screen.getByLabelText("What can we help with?") as HTMLSelectElement;
    expect(select.value).toBe(SCHOOL_WALKTHROUGH_TOPIC);
    expect(Array.from(select.options).map((option) => option.value)).toEqual([
      "Instructional coaching",
      "Curriculum & assessment",
      "Leadership & school improvement",
      "Professional learning & workshops",
      "Center for AI Services",
      "ARC resources / membership",
      SCHOOL_WALKTHROUGH_TOPIC,
      "Something else",
    ]);
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it("sends the inquiry to the team and tracks once only after persistence, despite double submit and rerender", async () => {
    let resolveInsert!: (value: { error: null }) => void;
    mocks.insert.mockReturnValue(new Promise((resolve) => { resolveInsert = resolve; }));
    const view = renderContact();
    fillValidForm();
    const form = screen.getByRole("button", { name: "Send message" }).closest("form")!;

    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(mocks.insert).toHaveBeenCalledTimes(1);
    expect(window.gtag).not.toHaveBeenCalled();

    resolveInsert({ error: null });
    await waitFor(() => expect(mocks.navigate).toHaveBeenCalledWith("/thank-you"));

    expect(mocks.insert).toHaveBeenCalledWith(expect.objectContaining({
      message: `[Topic: ${SCHOOL_WALKTHROUGH_TOPIC}]\n\nPlease show us the tools.`,
      source: "contact",
    }));
    expect(mocks.invoke).toHaveBeenCalledWith("notify-curriculum-lead", {
      body: expect.objectContaining({ topic: SCHOOL_WALKTHROUGH_TOPIC, formType: "Contact" }),
    });
    expect(window.gtag).toHaveBeenCalledTimes(1);
    expect(window.gtag).toHaveBeenCalledWith("event", "aces_walkthrough_request");
    expect((window.gtag as ReturnType<typeof vi.fn>).mock.calls[0]).toHaveLength(2);

    view.rerender(
      <MemoryRouter initialEntries={["/contact?interest=school-walkthrough"]}>
        <RContact />
      </MemoryRouter>,
    );
    expect(window.gtag).toHaveBeenCalledTimes(1);
  });

  it("passes an admin-edited walkthrough label to the team without changing analytics", async () => {
    mocks.walkthroughOptionLabel = "School tools guided walkthrough";
    renderContact();
    expect(screen.getByRole("option", { name: "School tools guided walkthrough" }).selected).toBe(true);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() => expect(mocks.navigate).toHaveBeenCalledWith("/thank-you"));
    expect(mocks.insert).toHaveBeenCalledWith(expect.objectContaining({
      message: "[Topic: School tools guided walkthrough]\n\nPlease show us the tools.",
    }));
    expect(mocks.invoke).toHaveBeenCalledWith("notify-curriculum-lead", {
      body: expect.objectContaining({ topic: "School tools guided walkthrough" }),
    });
    expect(window.gtag).toHaveBeenCalledExactlyOnceWith("event", "aces_walkthrough_request");
  });

  it("does not track a failed persistence request", async () => {
    mocks.insert.mockResolvedValue({ error: new Error("save failed") });
    renderContact();
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() => expect(mocks.insert).toHaveBeenCalledTimes(1));
    expect(window.gtag).not.toHaveBeenCalled();
    expect(mocks.invoke).not.toHaveBeenCalled();
    expect(mocks.navigate).not.toHaveBeenCalled();
  });

  it("does not track another inquiry as a walkthrough", async () => {
    renderContact("/contact");
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));

    await waitFor(() => expect(mocks.navigate).toHaveBeenCalledWith("/thank-you"));
    expect(mocks.invoke).toHaveBeenCalledWith("notify-curriculum-lead", {
      body: expect.objectContaining({ topic: "Instructional coaching" }),
    });
    expect(window.gtag).not.toHaveBeenCalled();
  });

  it("does not track a direct visit, refresh, or button click without a saved request", () => {
    const firstVisit = renderContact();
    expect(window.gtag).not.toHaveBeenCalled();
    firstVisit.unmount();
    renderContact();
    expect(window.gtag).not.toHaveBeenCalled();
    expect(mocks.insert).not.toHaveBeenCalled();
  });
});
