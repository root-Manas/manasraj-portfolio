/**
 * Visitor Recon System
 * Fetches visitor data and displays it in the terminal with a hacker aesthetic.
 */

document.addEventListener('DOMContentLoaded', async () => {
    const terminalBody = document.querySelector('.terminal-body');
    if (!terminalBody) return;

    // Helper to type text effect
    const typeText = async (element, text, speed = 30) => {
        return new Promise(resolve => {
            let i = 0;
            const interval = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, speed);
        });
    };

    // Helper to create line
    const createLine = (prompt = true) => {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        if (prompt) {
            const promptSpan = document.createElement('span');
            promptSpan.className = 'prompt';
            promptSpan.textContent = '$';
            line.appendChild(promptSpan);
        }
        const outputSpan = document.createElement('span');
        outputSpan.className = 'output';
        line.appendChild(outputSpan);
        terminalBody.appendChild(line);
        return outputSpan;
    };

    // Clear initial content after a delay
    await new Promise(r => setTimeout(r, 1500));
    terminalBody.innerHTML = '';

    // Step 1: Initialize
    let output = createLine();
    await typeText(output, ' init_recon_protocol.sh');

    // Step 2: Fetch Data
    const LOADING_line = createLine(false);
    LOADING_line.innerHTML = '<span class="prompt">></span> Scanning network...';

    try {
        // Fetch IP Data
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        // Parse Device
        const ua = navigator.userAgent;
        let device = "Unknown Terminal";
        if (ua.match(/Android/i)) device = "Android Device";
        else if (ua.match(/iPhone|iPad|iPod/i)) device = "Apple Mobile Device";
        else if (ua.match(/Windows/i)) device = "Windows Workstation";
        else if (ua.match(/Mac/i)) device = "Macintosh Workstation";
        else if (ua.match(/Linux/i)) device = "Linux System";

        // Step 3: Display Data
        const lines = [
            { label: 'TARGET_IP', val: data.ip },
            { label: 'LOCATION', val: `${data.city}, ${data.country_name}` },
            { label: 'ISP', val: data.org },
            { label: 'DEVICE', val: device },
            { label: 'STATUS', val: 'CONNECTED', color: '#00ff00' }
        ];

        for (const line of lines) {
            await new Promise(r => setTimeout(r, 400));
            const row = document.createElement('div');
            row.className = 'recon-row';
            row.innerHTML = `
                <span class="recon-label">${line.label}:</span>
                <span class="recon-val" style="${line.color ? 'color:' + line.color : ''}">${line.val}</span>
            `;
            terminalBody.appendChild(row);
        }

        // Final message
        await new Promise(r => setTimeout(r, 800));
        const final = createLine();
        await typeText(final, ' Access Granted. Welcome, user.');

    } catch (e) {
        // Fallback if blocked
        const err = createLine(false);
        err.style.color = '#ff4444';
        err.textContent = ' [!] SIGNAL LOST. PROXY DETECTED.';
    }
});
