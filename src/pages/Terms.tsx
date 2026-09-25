export default function Terms() {
  return (
    <div className="min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-copper text-xs tracking-widest uppercase mb-4">Legal</p>
        <h1 className="font-serif text-4xl md:text-5xl text-ivory mb-4">Terms & Conditions</h1>
        <p className="text-ivory/40 text-sm mb-16">Effective date: 1 January 2024 · The Standard Barber Co., 14 Kloof Street, Gardens, Cape Town, 8001</p>

        <div className="prose-custom space-y-12">
          <Section title="1. Booking & Appointments">
            <p>
              Appointments at The Standard Barber Co. ("The Standard", "we", "us") may be made via our website, by phone at +27 21 424 5678, or by email at <a href="mailto:hello@thestandardbarberco.co.za" className="text-copper hover:underline">hello@thestandardbarberco.co.za</a>. All appointments are subject to availability and are not confirmed until you receive a written or electronic confirmation from us.
            </p>
            <p>
              We reserve the right to decline or cancel a booking at our discretion, in which case any deposit paid will be refunded in full within 5 business days.
            </p>
            <p>
              First-time online bookings may require a deposit of 50% of the service price to secure the appointment. This deposit is deducted from the final bill on the day of your visit.
            </p>
          </Section>

          <Section title="2. Cancellations & Rescheduling">
            <p>
              We understand that plans change. We ask that you give us as much notice as possible if you need to cancel or reschedule.
            </p>
            <ul>
              <li><strong className="text-ivory/80">More than 24 hours' notice:</strong> Full refund of any deposit paid, or free rescheduling.</li>
              <li><strong className="text-ivory/80">2–24 hours' notice:</strong> 50% of the service price is charged as a late-cancellation fee. If a deposit was paid, it is forfeited.</li>
              <li><strong className="text-ivory/80">Less than 2 hours' notice or no-show:</strong> The full service price is charged. Clients who do not arrive and do not contact us will be required to pay the full amount before their next booking is confirmed.</li>
            </ul>
            <p>
              To cancel or reschedule, please call us at +27 21 424 5678 or email hello@thestandardbarberco.co.za with your name, appointment date, and time.
            </p>
          </Section>

          <Section title="3. Late Arrivals">
            <p>
              We run a tight schedule out of respect for all our clients. If you arrive more than 10 minutes late for your appointment, we may need to shorten or reschedule your service to avoid impacting the next client.
            </p>
            <p>
              If you arrive more than 15 minutes late without prior notice, we reserve the right to treat the appointment as a no-show and apply the cancellation fee accordingly.
            </p>
            <p>
              We recommend arriving 5 minutes before your scheduled time.
            </p>
          </Section>

          <Section title="4. Pricing">
            <p>
              All prices are listed in South African Rand (ZAR) and include VAT. Prices are subject to change without prior notice. The price applicable at the time of booking confirmation is the price that will be honoured.
            </p>
            <p>
              Promotional offers and discount codes (e.g. FIRST10) are valid for the specified period, cannot be combined with other offers, and may not be applied retroactively. First-visit discounts are limited to one use per client.
            </p>
            <p>
              Any additional services requested during your appointment that were not included in the original booking will be charged at our standard rates.
            </p>
          </Section>

          <Section title="5. Customer Information & Privacy">
            <p>
              When you make a booking, we collect your name, email address, and phone number. This information is used solely to manage your appointment and to contact you regarding that appointment. We do not sell or share your personal data with third parties.
            </p>
            <p>
              Booking records are retained for 12 months from the date of the appointment and then securely deleted. You may request deletion of your data at any time by emailing hello@thestandardbarberco.co.za.
            </p>
            <p>
              By making a booking, you consent to us contacting you via the email address and phone number you provided for appointment-related communications.
            </p>
          </Section>

          <Section title="6. Service Standards & Satisfaction">
            <p>
              We are committed to delivering high-quality barbering. If you are dissatisfied with your service, please let us know before leaving the shop. We will do our best to address any concern immediately.
            </p>
            <p>
              We do not offer refunds for completed services. If a genuine error has been made on our part, we will offer a complimentary corrective service within 7 days of the original appointment.
            </p>
          </Section>

          <Section title="7. Health & Safety">
            <p>
              We maintain a clean, hygienic environment and sterilise all tools between clients. If you have any known skin conditions, allergies, or sensitivities, please inform your barber before the service begins.
            </p>
            <p>
              We reserve the right to refuse service to any client whose condition may pose a health or safety risk to our staff or other clients.
            </p>
          </Section>

          <Section title="8. Children">
            <p>
              Children under 12 are welcome for our Kids' Cut service. A parent or legal guardian must be present for the duration of the appointment. We ask that children are accompanied and supervised at all times within the shop.
            </p>
          </Section>

          <Section title="9. Changes to These Terms">
            <p>
              We may update these terms from time to time. The current version will always be available on our website. Continued use of our services after any change constitutes acceptance of the revised terms.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              For questions about these terms, please contact us:
            </p>
            <address className="not-italic text-ivory/60">
              The Standard Barber Co.<br />
              14 Kloof Street, Gardens<br />
              Cape Town, 8001<br />
              South Africa<br />
              <a href="tel:+27214245678" className="text-copper hover:underline">+27 21 424 5678</a><br />
              <a href="mailto:hello@thestandardbarberco.co.za" className="text-copper hover:underline">hello@thestandardbarberco.co.za</a>
            </address>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-ivory mb-5 pb-4 border-b border-charcoal-700">{title}</h2>
      <div className="space-y-4 text-ivory/60 text-sm leading-relaxed [&_ul]:space-y-2 [&_ul]:pl-4 [&_li]:text-ivory/60">
        {children}
      </div>
    </section>
  );
}
