function saveLastUserPage() {
  const url = new URL(window.location.href);
  let pathParts = url.pathname.split('/').filter(Boolean);
  let basePath = '/';
  if (pathParts.length > 0) {
    basePath += pathParts[0] + '/';
  }
  const cleanUrl = url.origin + basePath;
  localStorage.setItem("last_user_page", cleanUrl);
}


