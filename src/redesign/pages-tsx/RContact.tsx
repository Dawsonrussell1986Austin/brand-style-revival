import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { RedesignLayout } from "../RedesignLayout";
import { SEO } from "@/components/SEO";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  role: z.string().trim().max(100).optional().or(z.literal("")),
  organization: z.string().trim().max(200).optional().or(z.literal("")),
  topic: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export default function RContact() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "Teacher",
    organization: "",
    topic: "Instructional coaching",
    message: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      toast.error(first ?? "Please check the form and try again.");
      return;
    }
    setSubmitting(true);
    try {
      const fullName = `${parsed.data.firstName} ${parsed.data.lastName}`.trim();
      const { error } = await supabase.from("contact_submissions").insert({
        name: fullName,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        organization: parsed.data.organization || null,
        role: parsed.data.role || null,
        message: `[Topic: ${parsed.data.topic || "—"}]\n\n${parsed.data.message}`,
        source: "contact",
      });
      if (error) throw error;

      // Fire-and-forget notification email
      supabase.functions
        .invoke("notify-curriculum-lead", {
          body: {
            firstName: parsed.data.firstName,
            lastName: parsed.data.lastName,
            email: parsed.data.email,
            organization: parsed.data.organization,
            role: parsed.data.role,
            formType: "Contact",
          },
        })
        .catch((err) => console.error("notify error", err));

      navigate("/thank-you");
    } catch (err) {
      console.error("Contact submit error", err);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RedesignLayout>
      <SEO title="Contact Us" description="Talk with the ACES PDSI team about coaching, curriculum, leadership, and AI services." url="/contact" />

      <section className="pagehero">
        <div className="crumb"><a href="/">Home</a><span className="sep">/</span><span>Contact</span></div>
        <div className="inner">
          <span className="kicker">Talk With Our Team</span>
          <h1>Let's start a <b>conversation.</b></h1>
          <p>Tell us a little about your school and goals, and we'll connect you with the right person on our team.</p>
        </div>
      </section>

      <section className="features">
        <div className="wrap">
          <div className="formwrap">
            <div className="formcard">
              <h2 style={{ fontSize: 30, marginBottom: 8 }}>Send us a message</h2>
              <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 26 }}>We typically respond within one business day.</p>
              <form onSubmit={handleSubmit}>
                <div className="field two">
                  <div className="field"><label>First name</label><input name="firstName" type="text" placeholder="Jordan" value={form.firstName} onChange={onChange} required /></div>
                  <div className="field"><label>Last name</label><input name="lastName" type="text" placeholder="Rivera" value={form.lastName} onChange={onChange} required /></div>
                </div>
                <div className="field two">
                  <div className="field"><label>Email</label><input name="email" type="email" placeholder="you@district.org" value={form.email} onChange={onChange} required /></div>
                  <div className="field"><label>Phone (optional)</label><input name="phone" type="tel" placeholder="(203) 000-0000" value={form.phone} onChange={onChange} /></div>
                </div>
                <div className="field two">
                  <div className="field"><label>Your role</label>
                    <select name="role" value={form.role} onChange={onChange}>
                      <option>Teacher</option>
                      <option>Instructional coach</option>
                      <option>School administrator</option>
                      <option>District leader</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="field"><label>District / School</label><input name="organization" type="text" placeholder="Your district or school" value={form.organization} onChange={onChange} /></div>
                </div>
                <div className="field"><label>What can we help with?</label>
                  <select name="topic" value={form.topic} onChange={onChange}>
                    <option>Instructional coaching</option>
                    <option>Curriculum &amp; assessment</option>
                    <option>Leadership &amp; school improvement</option>
                    <option>Professional learning &amp; workshops</option>
                    <option>Center for AI Services</option>
                    <option>ARC resources / membership</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="field"><label>Message</label><textarea name="message" placeholder="Tell us about your goals, timeline, and team..." value={form.message} onChange={onChange} required /></div>
                <button className="btn btn-green" type="submit" disabled={submitting} style={{ width: "100%", justifyContent: "center" }}>
                  {submitting ? "Sending…" : "Send message"}
                </button>
              </form>
            </div>

            <div className="contact-aside">
              <div className="ci">
                <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 11a16 16 0 006 6l1.6-1.2a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/></svg></div>
                <div><h5>Call us</h5><p>(860) 834-6147</p></div>
              </div>
              <div className="ci">
                <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></div>
                <div><h5>Email</h5><p><a href="mailto:mgohagon@aces.org">mgohagon@aces.org</a></p></div>
              </div>
              <div className="ci">
                <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                <div><h5>Visit</h5><p>205 Skiff Street<br/>Hamden, CT 06517</p></div>
              </div>
              <div className="mapph">
                <iframe title="ACES PDSI — 205 Skiff Street, Hamden, CT 06517" src="https://maps.google.com/maps?q=205%20Skiff%20Street,%20Hamden,%20CT%2006517&z=15&output=embed" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, zIndex: 1 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              </div>
            </div>
          </div>
        </div>
      </section>
    </RedesignLayout>
  );
}
