const fs = require('fs');

const htmlPath = 'index.html';
const cssDir = 'css';
const jsDir = 'js';

if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir);
if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir);

let html = fs.readFileSync(htmlPath, 'utf8');

let combinedCss = '';
let combinedJs = '';

// Extract all <style> blocks (except tailwind config, wait tailwind config is <script>)
html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, content) => {
    combinedCss += content + '\n\n';
    return ''; // Remove from HTML
});

// Extract all <script> blocks that don't have 'src' and are not 'tailwind-config'
html = html.replace(/<script(?![^>]*src)(?![^>]*id="tailwind-config")[^>]*>([\s\S]*?)<\/script>/gi, (match, content) => {
    combinedJs += content + '\n\n';
    return ''; // Remove from HTML
});

// Add <link> and <script src> before closing head and body
if (combinedCss.trim()) {
    fs.writeFileSync(`${cssDir}/styles.css`, combinedCss.trim());
    html = html.replace('</head>', '    <link rel="stylesheet" href="css/styles.css">\n</head>');
}

if (combinedJs.trim()) {
    // Add DOMContentLoaded wrapper if needed, but the original scripts were probably at the bottom or ran sequentially.
    // We'll just write them out.
    fs.writeFileSync(`${jsDir}/main.js`, combinedJs.trim());
    html = html.replace('</body>', '    <script src="js/main.js"></script>\n</body>');
}

fs.writeFileSync(htmlPath, html);

console.log('Project organized successfully!');
