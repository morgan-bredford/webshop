const html = (jsx, state) => {

    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/css/main.css">
            <link rel="stylesheet" href="/css/product.css">
            <title>MB's Webbshop</title>
        </head>
        <body>
            <div id="root">${jsx}</div>
            <script>window.__STATE__ = ${JSON.stringify(state)};</script>
            <script src="/client.bundle.js"></script>
        </body>
        </html>`  
    )
}
export default html