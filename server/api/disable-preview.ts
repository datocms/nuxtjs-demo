import { PREVIEW_MODE_COOKIE_NAME } from '~/utils/preview';

export default eventHandler(async (event) => {
  deleteCookie(event, PREVIEW_MODE_COOKIE_NAME);

  const redirectUrl = '/';

  sendRedirect(event, redirectUrl);

  event.node.res.end();
});
