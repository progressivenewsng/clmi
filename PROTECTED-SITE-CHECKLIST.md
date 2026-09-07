# CLMI Protected Site Checklist

This checklist covers the complete transition from the current static website to a database-backed content-management system with media uploads and email workflows. Authentication is intentionally deferred until the rest of the application is complete.

## Information Needed From You Now

- [x] Confirm that we are starting with content management and postponing authentication.
- [ ] Confirm the exact CLMI website/domain name, even if the domain is not connected yet.
- [x] Confirm that Supabase is acceptable for the database and file storage only.
- [x] Confirm that Resend is acceptable for form emails later.
- [x] Decide that reviews should be included in the future admin area.
- [x] Decide that publications and news should use a rich text editor.
- [x] Decide that every content type supports images and videos.
- [x] Approve the initial upload limits: 10 MB for images and 100 MB for videos.
- [ ] Decide which real publication content should be entered first.
- [ ] Decide which real news content should be entered first.
- [ ] Provide the first approved testimonies for entry.
- [ ] Provide the first approved gallery media for entry.
- [x] Confirm that the current public page designs should remain visually unchanged while their data becomes dynamic.
- [x] Confirm that placeholder content may remain during development.

## Deferred Until the App Is Complete

- [ ] Choose the final authentication provider.
- [ ] Choose whether authentication will use Supabase Auth, Auth.js, Clerk, or another provider.
- [ ] Decide whether there will be one administrator or multiple users.
- [ ] Decide whether `admin` and `editor` roles are required.
- [ ] Decide how password reset will work.
- [ ] Decide whether multi-factor authentication is required.
- [ ] Decide who may publish content.
- [ ] Decide who may view sensitive form submissions.
- [ ] Create administrator accounts only after the content-management workflow is complete.

## Recommended Architecture

- [ ] Confirm the primary stack: Next.js App Router + TypeScript + Tailwind CSS.
- [x] Confirm Supabase as the backend platform.
- [x] Confirm Supabase PostgreSQL as the database.
- [ ] Leave Supabase Auth unconfirmed until the authentication phase.
- [x] Confirm Supabase Storage for images and videos.
- [x] Confirm Resend for transactional email.
- [ ] Confirm Vercel for hosting and deployment.
- [x] Decide that reviews should be a fifth managed content type.
- [ ] Decide whether Cloudinary is unnecessary for the first version.
- [ ] Reconsider Cloudinary later only if advanced video transcoding, adaptive streaming, or complex media transformations are needed.

## Decisions You Must Make Before Coding

- [x] Confirm Supabase for database and storage.
- [x] Confirm Resend for future transactional email.
- [ ] Confirm Vercel for future deployment.
- [x] Decide that reviews will be managed from the protected side.
- [x] Decide that publications need rich text formatting.
- [x] Decide that news articles need rich text formatting.
- [x] Decide that content editors will use a rich text editor.
- [x] Decide that images and videos are supported for every content type.
- [x] Approve 10 MB as the initial image limit.
- [x] Approve 100 MB as the initial video limit.
- [ ] Decide whether public content requires an approval process before publishing.
- [ ] Record the approval decision for implementation after authentication is added.
- [ ] Decide whether content can be permanently deleted.
- [ ] Decide whether content should instead be archived or soft-deleted.
- [ ] Decide whether form submissions should appear in the admin dashboard.
- [ ] Decide how long form submissions should be retained.
- [ ] Decide the expected response time promised in confirmation emails.
- [ ] Decide who handles urgent or sensitive counselling matters.
- [ ] Decide whether counselling submissions require a special safeguarding process.
- [ ] Decide whether the admin interface should share the public website's visual style.

## Your External Setup Tasks

### Domain and Hosting

- [ ] Confirm the production domain for CLMI.
- [ ] Confirm that you control the domain's DNS settings.
- [ ] Create or confirm the GitHub repository for the project.
- [ ] Create or confirm the Vercel account.
- [ ] Connect the GitHub repository to Vercel.
- [ ] Add the production domain to Vercel.
- [ ] Configure the required domain DNS records for Vercel.
- [ ] Confirm that the deployed site uses HTTPS.

### Supabase Account and Project

- [ ] Create a Supabase account.
- [ ] Create a Supabase project for CLMI.
- [ ] Choose the Supabase project region.
- [ ] Record the Supabase project URL.
- [ ] Obtain the Supabase publishable/anonymous key.
- [ ] Obtain the Supabase service-role key.
- [ ] Store keys in a password manager.
- [ ] Never commit Supabase keys to Git.
- [ ] Never expose the service-role key to browser code.
- [ ] Decide whether a separate Supabase project is needed for development/staging.
- [ ] Decide whether a separate Supabase project is needed for production.

### Supabase Administrator Access

- [ ] Create the initial administrator email address.
- [ ] Decide whether the administrator email should be `admin@clmiglobal.org` or another address.
- [ ] Create the initial Supabase Auth user.
- [ ] Set a strong unique password.
- [ ] Store the password in a password manager.
- [ ] Enable multi-factor authentication where available.
- [ ] List every person who should have protected-site access.
- [ ] Assign each person an intended role.
- [ ] Confirm which users may publish content.
- [ ] Confirm which users may view sensitive form submissions.

### Resend Email Service

- [ ] Create a Resend account.
- [ ] Add the CLMI sending domain to Resend.
- [ ] Add the SPF DNS record requested by Resend.
- [ ] Add the DKIM DNS record requested by Resend.
- [ ] Add the DMARC record if required or approved.
- [x] Complete domain verification in Resend.
- [ ] Create a Resend API key.
- [ ] Store the API key in a password manager.
- [x] Decide the sender name: `CLMI`.
- [x] Decide the sender address: `noreply@clmi.org.ng`.
- [x] Confirm that `noreply@clmi.org.ng` is on the domain verified in Resend.
- [x] Confirm the real mailbox that receives internal notifications: `info@clmi.org.ng`.
- [x] Confirm that `info@clmi.org.ng` exists at the mail provider.
- [x] Confirm the internal notification address: `info@clmi.org.ng`.
- [ ] Test delivery to the internal notification mailbox.
- [ ] Test delivery to Gmail.
- [ ] Test delivery to Outlook or another non-Gmail provider.
- [ ] Check spam placement during testing.

### Real Content and Media

- [ ] Prepare the real publications to migrate.
- [ ] Prepare publication titles.
- [ ] Prepare publication excerpts.
- [ ] Prepare publication body content.
- [ ] Prepare publication authors.
- [ ] Prepare publication dates.
- [ ] Prepare publication cover images.
- [ ] Prepare publication video links or video files.
- [ ] Prepare publication download links where applicable.
- [ ] Prepare the real news articles to migrate.
- [ ] Prepare news titles.
- [ ] Prepare news excerpts.
- [ ] Prepare news body content.
- [ ] Prepare news dates.
- [ ] Prepare news cover images.
- [ ] Prepare news video links or video files.
- [ ] Prepare the real testimonies to migrate.
- [ ] Prepare testimony names.
- [ ] Prepare testimony roles.
- [ ] Prepare testimony quotes.
- [ ] Prepare testimony photographs.
- [ ] Prepare the real gallery media.
- [ ] Prepare gallery titles or captions.
- [ ] Prepare gallery images.
- [ ] Prepare gallery videos if videos will be supported.
- [ ] Prepare alt text for every public image.
- [ ] Prepare thumbnail images if separate thumbnails are needed.
- [ ] Replace all placeholder Unsplash imagery with approved CLMI media.
- [ ] Confirm image orientation and quality.
- [ ] Confirm video format and quality.
- [ ] Confirm that file sizes fit the chosen upload limits.

### Rights and Approval

- [ ] Confirm CLMI has permission to publish every person's name.
- [ ] Confirm CLMI has permission to publish every person's photograph.
- [ ] Confirm CLMI has permission to publish every testimony.
- [ ] Confirm CLMI has permission to publish every external review.
- [ ] Confirm CLMI has permission to publish every video.
- [ ] Confirm CLMI has permission to publish every quote.
- [ ] Confirm CLMI has permission to publish third-party logos.
- [ ] Obtain written consent where necessary.
- [ ] Decide how consent records will be stored.
- [ ] Decide who approves new content before publication.
- [ ] Decide who approves edits to already-published content.

### Public Contact and Donation Information

- [ ] Verify the official CLMI address.
- [ ] Verify the official CLMI phone number.
- [ ] Verify the official CLMI email address.
- [ ] Verify every social-media URL.
- [ ] Verify the Naira bank account details.
- [ ] Verify the Dollar bank account details.
- [ ] Confirm the exact organization/account names.
- [ ] Confirm that the donation disclaimer is accurate.
- [ ] Confirm that all public placeholder contact details are replaced.

### Privacy and Response Policies

- [ ] Prepare a privacy notice for the website.
- [ ] Explain what data the public forms collect.
- [ ] Explain why the data is collected.
- [ ] Explain who can access submissions.
- [ ] Explain how long submissions are retained.
- [ ] Explain how a person can request deletion.
- [ ] Decide whether a consent checkbox is required on forms.
- [ ] Decide the retention period for form submissions.
- [ ] Prepare the Join CLMI response procedure.
- [ ] Prepare the Prayer Request response procedure.
- [ ] Prepare the Call to Salvation response procedure.
- [ ] Prepare the Counselling response procedure.
- [ ] Set the response-time promise for confirmation emails.
- [ ] Define how urgent matters should be redirected.
- [ ] Define how sensitive counselling matters should be handled.
- [ ] Define who monitors incoming form notifications.

## Environment Variables to Prepare

Create `.env.local` locally and add the same values to Vercel Environment Variables. Do not commit `.env.local`.

- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `RESEND_API_KEY`
- [ ] `RESEND_FROM_EMAIL`
- [ ] `CLMI_NOTIFICATION_EMAIL`
- [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] Add variables to local development.
- [ ] Add variables to Vercel preview environment.
- [ ] Add variables to Vercel production environment.
- [ ] Verify that secrets are not present in committed files.
- [ ] Verify that secrets are not rendered into browser HTML.

## Protected Routes to Build

- [ ] `/login`
- [ ] `/admin`
- [ ] `/admin/publications`
- [ ] `/admin/publications/new`
- [ ] `/admin/publications/[id]/edit`
- [ ] `/admin/news`
- [ ] `/admin/news/new`
- [ ] `/admin/news/[id]/edit`
- [ ] `/admin/testimonies`
- [ ] `/admin/testimonies/new`
- [ ] `/admin/testimonies/[id]/edit`
- [ ] `/admin/gallery`
- [ ] `/admin/gallery/upload`

## Authentication Implementation

- [ ] Install the required Supabase client packages.
- [ ] Create browser-side Supabase client utilities.
- [ ] Create server-side Supabase client utilities.
- [ ] Create server-only service-role utilities where required.
- [ ] Build the login form.
- [ ] Add email and password validation.
- [ ] Add login error states.
- [ ] Add login loading state.
- [ ] Add session persistence.
- [ ] Add logout functionality.
- [ ] Add password-reset request flow.
- [ ] Add password-reset completion flow.
- [ ] Protect every `/admin/*` route.
- [ ] Redirect unauthenticated users to `/login`.
- [ ] Redirect authenticated users away from `/login` where appropriate.
- [ ] Add server-side authentication checks.
- [ ] Prevent public registration.
- [ ] Add administrator profile records.
- [ ] Add role checks.
- [ ] Add admin-only user-management permissions if needed.
- [ ] Add editor permissions if the editor role is approved.
- [ ] Add sign-out confirmation or clear session handling.

## Database Implementation

### `profiles`

- [x] Create the `profiles` table.
- [ ] Add `id`.
- [ ] Add `user_id`.
- [ ] Add `display_name`.
- [ ] Add `role`.
- [ ] Add `created_at`.
- [ ] Add `updated_at`.
- [ ] Add a unique constraint for `user_id`.
- [ ] Add valid role constraints.
- [ ] Add row-level security policies.

### `publications`

- [x] Create the `publications` table.
- [ ] Add `id`.
- [ ] Add `title`.
- [ ] Add `slug`.
- [ ] Add `excerpt`.
- [ ] Add `body`.
- [ ] Add `author`.
- [ ] Add `cover_image_url`.
- [ ] Add `video_url`.
- [ ] Add `publication_date`.
- [ ] Add `status`.
- [ ] Add `created_by`.
- [ ] Add `created_at`.
- [ ] Add `updated_at`.
- [ ] Add `published_at`.
- [ ] Add a unique slug constraint.
- [ ] Add valid status constraints.
- [ ] Add public read policy for published records only.
- [ ] Add protected create policy.
- [ ] Add protected update policy.
- [ ] Add protected delete/archive policy.

### `news_items`

- [x] Create the `news_items` table.
- [ ] Add `id`.
- [ ] Add `title`.
- [ ] Add `slug`.
- [ ] Add `excerpt`.
- [ ] Add `body`.
- [ ] Add `cover_image_url`.
- [ ] Add `video_url`.
- [ ] Add `media_type`.
- [ ] Add `publication_date`.
- [ ] Add `status`.
- [ ] Add `created_by`.
- [ ] Add `created_at`.
- [ ] Add `updated_at`.
- [ ] Add `published_at`.
- [ ] Add a unique slug constraint.
- [ ] Add valid media-type constraints.
- [ ] Add valid status constraints.
- [ ] Add public read policy for published records only.
- [ ] Add protected CRUD policies.

### `testimonies`

- [x] Create the `testimonies` table.
- [ ] Add `id`.
- [ ] Add `name`.
- [ ] Add `role`.
- [ ] Add `quote`.
- [ ] Add `photo_url`.
- [ ] Add `status`.
- [ ] Add `created_by`.
- [ ] Add `created_at`.
- [ ] Add `updated_at`.
- [ ] Add `published_at`.
- [ ] Add valid status constraints.
- [ ] Add public read policy for published records only.
- [ ] Add protected CRUD policies.

### `gallery_items`

- [x] Create the `gallery_items` table.
- [ ] Add `id`.
- [ ] Add `title`.
- [ ] Add `caption`.
- [ ] Add `media_url`.
- [ ] Add `thumbnail_url`.
- [ ] Add `media_type`.
- [ ] Add `alt_text`.
- [ ] Add `sort_order`.
- [ ] Add `status`.
- [ ] Add `created_by`.
- [ ] Add `created_at`.
- [ ] Add `updated_at`.
- [ ] Add `published_at`.
- [ ] Add valid media-type constraints.
- [ ] Add valid status constraints.
- [ ] Add public read policy for published records only.
- [ ] Add protected CRUD policies.

### `form_submissions`

- [x] Create the `form_submissions` table.
- [ ] Add `id`.
- [ ] Add `form_type`.
- [ ] Add `name`.
- [ ] Add `email`.
- [ ] Add `phone`.
- [ ] Add `location`.
- [ ] Add `occupation`.
- [ ] Add `ministry`.
- [ ] Add `message`.
- [ ] Add `status`.
- [ ] Add `admin_notes`.
- [ ] Add `created_at`.
- [ ] Add valid form-type constraints.
- [ ] Add protected read policies.
- [ ] Prevent public read access.
- [ ] Decide whether submissions can be deleted or only archived.

## Storage Implementation

- [x] Create the shared `clmi-media` storage bucket.
- [ ] Create a private or appropriately restricted news-media bucket.
- [ ] Create a private or appropriately restricted testimony-media bucket.
- [ ] Create a private or appropriately restricted gallery-media bucket.
- [ ] Define allowed image MIME types.
- [ ] Define allowed video MIME types.
- [ ] Define maximum file sizes.
- [ ] Generate safe unique storage paths.
- [ ] Do not trust original file names.
- [ ] Validate file types server-side.
- [ ] Validate file sizes server-side.
- [ ] Add upload progress UI.
- [ ] Add upload cancellation or failure handling.
- [ ] Add retry handling for failed uploads.
- [ ] Generate or store thumbnails where needed.
- [ ] Add signed URLs for private media where needed.
- [ ] Remove orphaned files when content is permanently deleted.
- [ ] Define behavior for replacing an existing image or video.
- [ ] Confirm whether public media can use public bucket URLs.

## Admin Dashboard Implementation

- [ ] Build the protected admin layout.
- [ ] Build the admin sidebar/navigation.
- [ ] Add dashboard summary cards.
- [ ] Show total publications.
- [ ] Show total news items.
- [ ] Show total testimonies.
- [ ] Show total gallery items.
- [ ] Show draft count.
- [ ] Show published count.
- [ ] Show form-submission count.
- [ ] Show recent content.
- [ ] Add quick-create links.
- [ ] Add loading states.
- [ ] Add empty states.
- [ ] Add error states.
- [ ] Add responsive admin layouts.
- [ ] Add a visible signed-in user indicator.
- [ ] Add sign-out control.

## Publication Manager

- [x] Build publication list view.
- [ ] Add search.
- [ ] Add filtering by draft/published/archived status.
- [ ] Add sorting.
- [x] Build create-publication form.
- [ ] Add title field.
- [ ] Add slug field.
- [ ] Add automatic slug generation.
- [ ] Add manual slug editing.
- [ ] Add slug collision validation.
- [ ] Add excerpt field.
- [x] Add rich body editor or Markdown editor.
- [ ] Add author field.
- [ ] Add publication date field.
- [x] Add cover-image upload.
- [x] Add video URL or upload field if required.
- [ ] Add external-link fields if required.
- [x] Add draft save action.
- [ ] Add preview action.
- [x] Add publish action.
- [ ] Add unpublish action.
- [ ] Add archive action.
- [ ] Add edit action.
- [ ] Add delete/archive confirmation.
- [ ] Add unsaved-changes protection.
- [ ] Ensure only published publications appear publicly.

## News Manager

- [x] Build news list view.
- [ ] Add search.
- [ ] Add filtering by draft/published/archived status.
- [ ] Add sorting.
- [x] Build create-news form.
- [ ] Add title field.
- [ ] Add slug field.
- [ ] Add automatic slug generation.
- [ ] Add manual slug editing.
- [ ] Add excerpt field.
- [x] Add rich body editor or Markdown editor.
- [ ] Add publication date field.
- [ ] Add media-type selection.
- [x] Add cover-image upload.
- [x] Add video URL or upload field.
- [ ] Add draft save action.
- [ ] Add preview action.
- [ ] Add publish action.
- [ ] Add unpublish action.
- [ ] Add archive action.
- [ ] Add edit action.
- [ ] Add delete/archive confirmation.
- [ ] Ensure only published news appears publicly.

## Testimony Manager

- [x] Build testimony list view.
- [ ] Add search.
- [ ] Add filtering by draft/published/archived status.
- [x] Build create-testimony form.
- [ ] Add person's name field.
- [ ] Add role field.
- [ ] Add quote field.
- [x] Add photograph upload.
- [ ] Add consent confirmation or internal consent tracking.
- [ ] Add draft save action.
- [ ] Add preview action.
- [ ] Add publish action.
- [ ] Add unpublish action.
- [ ] Add archive action.
- [ ] Add edit action.
- [ ] Add delete/archive confirmation.
- [ ] Ensure only published testimonies appear publicly.
- [ ] Keep the public `/testimonies` page as a testimony page.
- [ ] Keep reviews separate from testimonies.

## Gallery Manager

- [x] Build gallery list/grid view.
- [ ] Add search or filtering where useful.
- [ ] Add multi-file upload support if required.
- [x] Add single-file upload support.
- [ ] Add title field.
- [ ] Add caption field.
- [ ] Add alt-text field.
- [ ] Add media-type selection.
- [x] Add image upload.
- [x] Add video upload if approved.
- [ ] Add thumbnail handling.
- [ ] Add sort-order controls.
- [ ] Add draft save action.
- [ ] Add preview action.
- [ ] Add publish action.
- [ ] Add unpublish action.
- [ ] Add archive action.
- [ ] Add edit action.
- [ ] Add delete/archive confirmation.
- [ ] Add drag-and-drop ordering if useful.
- [ ] Ensure only published gallery items appear publicly.

## Public-Site Data Migration

- [ ] Create typed database query functions.
- [ ] Replace publication reads from `src/data/mock.ts`.
- [ ] Replace news reads from `src/data/mock.ts`.
- [ ] Replace testimony reads from `src/data/mock.ts`.
- [ ] Replace gallery reads from `src/data/mock.ts`.
- [ ] Keep public component prop shapes stable where possible.
- [ ] Update dynamic publication pages to query by slug.
- [ ] Update dynamic news pages to query by slug.
- [ ] Add not-found handling for missing or unpublished records.
- [ ] Ensure drafts cannot be accessed through public routes.
- [ ] Ensure archived records cannot be accessed through public routes.
- [ ] Decide whether static generation or dynamic rendering is appropriate.
- [ ] Add revalidation or cache invalidation after publishing.
- [ ] Remove mock data only after migration is verified.
- [ ] Keep the public testimony page separate from external reviews.
- [ ] Decide whether the homepage review carousel remains static or becomes database-backed later.

## Form and Resend Implementation

### Shared Form Behavior

- [ ] Create shared server-side validation schemas.
- [ ] Validate required fields.
- [ ] Validate email format.
- [ ] Normalize submitted text.
- [ ] Limit request body sizes.
- [ ] Add honeypot fields.
- [ ] Add server-side rate limiting.
- [ ] Decide whether Cloudflare Turnstile is needed.
- [ ] Add success state handling.
- [ ] Add error state handling.
- [ ] Prevent accidental duplicate submissions.
- [ ] Avoid exposing internal errors to visitors.
- [ ] Avoid logging sensitive form data.

### API Routes

- [ ] Build `/api/forms/join`.
- [ ] Build `/api/forms/prayer-request`.
- [ ] Build `/api/forms/call-to-salvation`.
- [ ] Build `/api/forms/counselling`.
- [ ] Validate each request server-side.
- [ ] Save each valid request to `form_submissions`.
- [ ] Send an internal notification through Resend.
- [ ] Send a visitor confirmation email through Resend.
- [ ] Return a clear success response.
- [ ] Return a safe error response.
- [ ] Add request logging without sensitive content.

### Join CLMI Email

- [ ] Write the internal Join CLMI notification subject.
- [ ] Write the internal Join CLMI notification template.
- [ ] Write the visitor Join CLMI confirmation subject.
- [ ] Write the visitor Join CLMI confirmation template.
- [ ] Include expected response timing.
- [ ] Include official CLMI contact details.
- [ ] Confirm the existing Join CLMI fields are preserved.

### Prayer Request Email

- [ ] Write the internal Prayer Request notification subject.
- [ ] Write the internal Prayer Request notification template.
- [ ] Write the visitor Prayer Request confirmation subject.
- [ ] Write the visitor Prayer Request confirmation template.
- [ ] Include expected response timing.
- [ ] Include official CLMI contact details.
- [ ] Include emergency-service guidance where appropriate.

### Call to Salvation Email

- [ ] Write the internal Call to Salvation notification subject.
- [ ] Write the internal notification template.
- [ ] Write the visitor confirmation subject.
- [ ] Write the visitor confirmation template.
- [ ] Include expected response timing.
- [ ] Include official CLMI contact details.

### Counselling Email

- [ ] Write the internal Counselling notification subject.
- [ ] Write the internal notification template.
- [ ] Write the visitor confirmation subject.
- [ ] Write the visitor confirmation template.
- [ ] Include expected response timing.
- [ ] Include official CLMI contact details.
- [ ] Include confidentiality wording where appropriate.
- [ ] Include emergency-service guidance where appropriate.

## Security Implementation

- [ ] Protect admin routes with middleware or equivalent route protection.
- [ ] Repeat authentication checks on the server.
- [ ] Configure Supabase Row Level Security on every table.
- [ ] Restrict draft and archived content from public queries.
- [ ] Restrict form submissions from public reads.
- [ ] Keep service-role operations server-only.
- [ ] Keep Resend API keys server-only.
- [ ] Validate upload MIME types server-side.
- [ ] Validate upload sizes server-side.
- [ ] Sanitize rich text or Markdown output.
- [ ] Prevent unsafe HTML injection.
- [ ] Prevent slug collisions.
- [ ] Add rate limiting to login and form endpoints.
- [ ] Avoid sensitive data in URLs.
- [ ] Avoid sensitive data in client-side logs.
- [ ] Add audit fields for creators and timestamps.
- [ ] Review storage bucket permissions.
- [ ] Review database policies before production.
- [ ] Review Vercel environment-variable scopes.
- [ ] Configure backups according to the selected Supabase plan.
- [ ] Document recovery steps.

## Testing Checklist

### Authentication Tests

- [ ] Unauthenticated users cannot access `/admin`.
- [ ] Unauthenticated users are redirected to `/login`.
- [ ] Valid administrators can log in.
- [ ] Invalid passwords show a safe error.
- [ ] Logout invalidates the session.
- [ ] Password reset works.
- [ ] Expired sessions are handled correctly.
- [ ] Editors cannot perform admin-only actions if roles are enabled.

### Content Tests

- [ ] Admin can create a publication draft.
- [ ] Admin can edit a publication draft.
- [ ] Admin can preview a publication draft.
- [ ] Admin can publish a publication.
- [ ] Admin can unpublish a publication.
- [ ] Admin can archive or delete a publication.
- [ ] Admin can create a news draft.
- [ ] Admin can edit a news draft.
- [ ] Admin can preview a news draft.
- [ ] Admin can publish news.
- [ ] Admin can unpublish news.
- [ ] Admin can create a testimony draft.
- [ ] Admin can publish a testimony.
- [ ] Admin can create gallery content.
- [ ] Admin can upload gallery media.
- [ ] Admin can reorder gallery items if ordering is enabled.
- [ ] Duplicate slugs are rejected.
- [ ] Invalid content is rejected.
- [ ] Draft content never appears publicly.
- [ ] Archived content never appears publicly.
- [ ] Published content appears on the correct public page.
- [ ] Missing slugs return a proper not-found response.

### Upload Tests

- [ ] Valid images upload successfully.
- [ ] Valid videos upload successfully if enabled.
- [ ] Invalid MIME types are rejected.
- [ ] Oversized files are rejected.
- [ ] Failed uploads show a useful error.
- [ ] Failed uploads can be retried.
- [ ] Replacing media does not leave unwanted orphaned files.
- [ ] Deleted content removes associated files when required.
- [ ] Images render correctly on desktop.
- [ ] Images render correctly on mobile.
- [ ] Videos render correctly on desktop.
- [ ] Videos render correctly on mobile.

### Form and Email Tests

- [ ] Join CLMI submissions are validated.
- [ ] Prayer Request submissions are validated.
- [ ] Call to Salvation submissions are validated.
- [ ] Counselling submissions are validated.
- [ ] Invalid email addresses are rejected.
- [ ] Missing required fields are rejected.
- [ ] Honeypot submissions are rejected or ignored.
- [ ] Rate limits work.
- [ ] Submissions are stored in Supabase.
- [ ] Internal notification emails arrive.
- [ ] Visitor confirmation emails arrive.
- [ ] Email content is correct for each form.
- [ ] Email links use the production domain.
- [ ] Email failures do not expose secrets.
- [ ] Duplicate submissions are handled appropriately.
- [ ] Sensitive form content is not publicly accessible.

### Responsive and Browser Tests

- [ ] Test the public site on mobile width.
- [ ] Test the public site on tablet width.
- [ ] Test the public site on desktop width.
- [ ] Test the admin dashboard on mobile width.
- [ ] Test the admin dashboard on desktop width.
- [ ] Test in Chrome.
- [ ] Test in Edge.
- [ ] Test in Safari where available.
- [ ] Check keyboard navigation.
- [ ] Check visible focus states.
- [ ] Check form labels and accessibility.
- [ ] Check image alt text.
- [ ] Check color contrast.

## Deployment and Launch

- [ ] Run the local development build.
- [ ] Run TypeScript checks.
- [ ] Run ESLint.
- [ ] Run all available tests.
- [x] Apply database migrations to the development project.
- [ ] Test the complete workflow in development.
- [ ] Apply database migrations to the production project.
- [ ] Create production storage buckets.
- [ ] Configure production storage policies.
- [ ] Configure production authentication settings.
- [ ] Add production environment variables to Vercel.
- [ ] Deploy to Vercel preview.
- [ ] Test the preview deployment.
- [ ] Configure the production domain.
- [ ] Deploy to production.
- [ ] Test production login.
- [ ] Test production uploads.
- [ ] Test production publishing.
- [ ] Test production public pages.
- [ ] Test production forms.
- [ ] Test production email delivery.
- [ ] Confirm backups are active.
- [ ] Confirm monitoring and error reporting.
- [ ] Document administrator login and recovery procedures.
- [ ] Document content publishing procedures.
- [ ] Document form-submission handling procedures.
- [ ] Document media replacement and deletion procedures.
- [ ] Remove or replace all remaining placeholder content.
- [ ] Announce the admin workflow to approved administrators.

## Completion Definition

The protected side is ready for launch when:

- [ ] Only authenticated, authorized users can access admin tools.
- [ ] Publications can be created, edited, previewed, published, unpublished, and archived.
- [ ] News can be created, edited, previewed, published, unpublished, and archived.
- [ ] Testimonies can be created, edited, previewed, published, unpublished, and archived.
- [ ] Gallery images and approved videos can be uploaded and managed.
- [ ] Only published content appears on public pages.
- [ ] Public pages use database content instead of mock content.
- [ ] All four public forms store submissions securely.
- [ ] CLMI receives internal email notifications for all four forms.
- [ ] Visitors receive the correct confirmation email for all four forms.
- [ ] Upload validation and security policies are active.
- [ ] Privacy and response policies are ready.
- [ ] Real approved content and media are loaded.
- [ ] Production deployment has been tested end to end.
