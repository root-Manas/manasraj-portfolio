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
        let data = {};

        // Try Primary API (ipapi.co)
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (!response.ok) throw new Error('API 1 Failed');
            data = await response.json();

            if (data.error) throw new Error('API Error');
        } catch (e) {
            // Try Backup API (simpler)
            try {
                // Determine rough location via timezone as fallback if easy
                // Or just proceed to secure mode which is cooler
                throw new Error('Fallback to Secure Mode');
            } catch (err) {
                throw new Error('All APIs Failed');
            }
        }

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
            { label: 'TARGET_IP', val: data.ip || '127.0.0.1' },
            { label: 'LOCATION', val: data.city ? `${data.city}, ${data.country_name || data.country}` : 'Unknown Sector' },
            { label: 'ISP', val: data.org || data.connection?.isp || 'Encrypted Tunnel' },
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
        await typeText(final, ' Access Granted. Welcome,reader.');

    } catch (e) {
        // Fallback: "Secure Mode" - User feels cool instead of broken
        await new Promise(r => setTimeout(r, 400));

        const lines = [
            { label: 'TARGET_IP', val: 'HIDDEN (PROXY DETECTED)', color: '#ffbd2e' },
            { label: 'LOCATION', val: 'CLASSIFIED', color: '#ffbd2e' },
            { label: 'ENCRYPTION', val: 'AES-256-GCM', color: '#00ff00' },
            { label: 'STATUS', val: 'SECURE', color: '#00ff00' }
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

        await new Promise(r => setTimeout(r, 800));
        const final = createLine();
        await typeText(final, ' Identity Masked. Welcome, Guest.');
    }
});
