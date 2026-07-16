# TrustLayer Design Guidelines

## Mobile-First Desktop Philosophy
For TrustLayer, every page should follow the mobile-first philosophy and then scale to desktop. The desktop version should not become an admin dashboard—it should simply provide more space while preserving the same flow and components.

### Common Desktop Rules

1. **Keep the same navigation**: Logo, Deals, Payments, Disputes, Wallet, Help, Notification, Profile.
2. **Same content**: Don't add charts, analytics, graphs, tables, or admin widgets. Keep it consumer-facing.
3. **Larger cards**: Instead of 300px width on mobile, use 720–900px on desktop. Do not convert cards into tables/spreadsheets.
4. **Bigger thumbnails**: Use large previews instead of tiny icons.
5. **Same Trust Score**: Always keep the Trust Score / Build Buyer Trust component on the right (exactly like Create Deal).
6. **Same buttons**: Use Blue Primary and White Secondary. Never introduce new button styles.
7. **Same spacing**: 24px section spacing, 16px internal padding, 20px card radius, Soft shadow, White background.

### Page-Specific Guidelines
- **Deals**: Larger thumbnails, better spacing, preserve card layout, avoid tables.
- **Payments**: Keep the card style. No spreadsheets.
- **Disputes**: Large cards, not table rows.
- **Wallet**: Exactly same as mobile. Don't convert into a banking dashboard.
- **Help**: Still card based.

**Core Principle**: Every TrustLayer desktop page should feel like an enlarged version of the mobile app, not a separate desktop product. The interaction patterns, cards, hierarchy, and content should remain consistent across devices, with desktop simply offering more breathing room, larger previews, and a two-column layout where appropriate.
