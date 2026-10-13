<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep reusable portfolio presentation in src/components/portfolio.tsx and content pages in TanStack file routes, so the reference styling stays consistent across pages.
- Define the portfolio's typography, palette, spacing, and animations in src/styles.css; use semantic button variants for its controls.
- The contact form prepares an email in the visitor's email application, without claiming server-side delivery or storing submissions.
