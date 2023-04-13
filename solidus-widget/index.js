addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    const url = new URL(request.url)
  
    if (url.pathname === '/solidus_widget.html' || url.pathname === '/') {
      const response = await fetch('https://raw.githubusercontent.com/klaxurit/widgetback/main/solidus_widget.html')
      return new Response(response.body, {
        headers: { 'content-type': 'text/html' },
      })
    } else if (url.pathname === '/solidus_widget.css') {
      const response = await fetch('https://raw.githubusercontent.com/klaxurit/widgetback/main/solidus_widget.css')
      return new Response(response.body, {
        headers: { 'content-type': 'text/css' },
      })
    } else if (url.pathname === '/solidus_widget.js') {
      const response = await fetch('https://raw.githubusercontent.com/klaxurit/widgetback/main/solidus_widget.js')
      return new Response(response.body, {
        headers: { 'content-type': 'application/javascript' },
      })
    } else {
      return new Response('Not found', { status: 404 })
    }
  }