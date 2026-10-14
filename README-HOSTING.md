# RS Auto Clinic: New One-Page Site, Handover

## Package contents
```
index.html            the whole site (one page)
css/styles.css        styles (mobile-first)
js/main.js            menu, smooth scroll, open/closed indicator, appointment date mapping
assets/img/           rs-logo.png, hero-technician.jpg, gallery-1..8.jpg, readers-choice-2025.png, shop-interior.jpg
favicon.ico           the existing favicon
htaccess-additions.txt  optional redirects to merge into the existing .htaccess
```
All paths are relative. Plain static files: no build step, PHP or database.

## Current host: Exact Hosting (Apache, shared/cPanel) ✅ compatible
rsautoclinic.com is hand-coded static HTML on Apache at Exact Hosting (server shark.exacthosting.com). This package uploads directly.

### Upload steps (cPanel File Manager or FTP)
1. **Back up first:** download a copy of `public_html` (or zip it in File Manager → Compress).
2. Upload `rsauto-site.zip` to `public_html` and Extract. Move the contents of the `rsauto-site/` folder up into `public_html`, allowing it to overwrite `index.html` and `favicon.ico`.
   - The new files don't clash with the old ones: the new stylesheet is `css/styles.css` and the old site's CSS has other names. Script `js/main.js` and the new `assets/` folder are also new names.
3. **Keep `jobs.html`** (the footer "We're Hiring!" link still points to it).
4. **`.htaccess`: don't replace the existing file.** Open it and paste in the lines from `htaccess-additions.txt`, so old page URLs (Google results, ads, bookmarks) 301-redirect to the matching section of the new page. After that, the old .html pages can be deleted or left in place; the redirects take priority.
5. Visit https://www.rsautoclinic.com/ and hard-refresh. Test both forms (below).
6. Email (Tucows Hosted Email, MX) and DNS (name-services.com) need **no changes**.

## Forms: original endpoints kept ✅
Both forms still post directly to the same Jotform forms, with identical field names, so submissions keep arriving in the same Jotform account and email notifications.
- **Appointment request** → `https://submit.jotform.ca/submit/60484058640254/`
  Change: the three month/day/year boxes are replaced by one date picker (past dates blocked). `js/main.js` copies the chosen date into the original hidden `q18_preferredDate[month]/[day]/[year]` fields on submit. The time dropdowns keep the same values (Morning 7–11, Afternoon 12–4; 00/15/30/45; AM/PM).
- **Contact** → `https://submit.jotform.ca/submit/52477137841258/`
- After submitting, visitors land on Jotform's thank-you page, the same as before. To return them to the site, set the Thank You page in Jotform to redirect to `https://www.rsautoclinic.com/#home`.
- **Test once after upload:** Jotform sometimes requires its own JS for spam checks on direct HTML posts. Send one test from each form and confirm it appears in Jotform → Submissions. If one is rejected, switch that form to Jotform's iframe embed (Jotform → Publish → Embed) in the same spot.

## Link / booking check (2026-10-13)
- tel:+19053351313 everywhere: header call button, the hero, the booking section, the contact section, the footer and the floating mobile button. The "Book" button in the sticky header jumps to the appointment form.
- Google review (g.page/rsautoclinic/review) 200 · Instagram 200 · Facebook (login wall to bots) · YouTube drive video 200 · Google Maps embed and directions OK.
- The Readers' Choice listing (insidehalton.com) rate-limited the automated check (429); confirm it in a browser.
- All external links open in a new tab with rel="noopener".
- The Google Ads conversion tag (AW-968512838) from the old site is NOT included. Add it back in `<head>` if they still run Google Ads.

## For the client to confirm
- Specials and prices (they change monthly; October's are shown).
- "Open now / Closed now" uses Mon–Fri 7:30–4:30 Toronto time. It doesn't know about holidays.
- Review excerpts: 8 real reviews, some trimmed with "…".
- Whether to keep the separate jobs.html page.
