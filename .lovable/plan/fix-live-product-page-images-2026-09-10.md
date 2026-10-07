# Fix live Product Page images

## Scope
Update only the seven featured product photos on the existing Product Page. Preserve all layout, text, styles, interactions, and other website content.

## Implementation
1. Upload the seven newest supplied photos as immutable, uniquely named website assets to prevent old Cloudflare-cached files being reused.
2. Change only the seven existing Product Page image imports and mappings:
   - Paakku (Areca) Plates
   - Paakku Cups
   - Paper Plates
   - Paper Cups
   - Yellow Tea Cups
   - Paakku Food Containers
   - Dining Rolls
3. Confirm each existing card still renders one complete, undistorted image above its unchanged details.
4. Check the application build and product page image requests.
5. Publish the latest project version, then verify `https://vyenterprises.in/products` serves the new production image URLs successfully.

## Technical details
- Use immutable Lovable-hosted asset URLs with new identifiers, which bypasses stale application/CDN image caches without changing the page design.
- The linked project repository will receive the same code update through the existing project synchronization.
- If the custom domain remains pinned to an external Cloudflare deployment after publishing, report that deployment boundary explicitly with the exact evidence rather than claiming success.
