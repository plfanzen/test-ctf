registerTeraHandler("genFakeFlag", (args) => {
    const buffer = new Uint8Array(16);
    crypto.getRandomValues(buffer);
    const hexString = Array.from(buffer).map(b => b.toString(16).padStart(2, '0')).join('');
    return `PLFANZEN{${hexString}}`;
});
