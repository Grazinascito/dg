import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: "giscus",
      options: {
        // from data-repo
        repo: "grazinascito/dg",
        // from data-repo-id
        repoId: "R_kgDONPlHHg",
        // from data-category
        category: "General",
        // from data-category-id
        categoryId: "DIC_kwDONPlHHs4CkVqb",
      },
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.MobileOnly(Component.Search()),
    Component.MobileOnly(Component.Spacer()),

    Component.MobileOnly(Component.Explorer()),
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    // Component.PageTitle(),

    Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(Component.Search()),

    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.SpotifyEmbed,
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.MobileOnly(Component.Spacer()),

    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
