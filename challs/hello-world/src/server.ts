// Start a raw TCP listener on port 8080
const listener = Deno.listen({ port: 8080 });

async function handleConnection(conn: Deno.TcpConn) {
    const buffer = new Uint8Array(1024);
    await conn.write(new TextEncoder().encode("You can get a flag here, just tell me the password: "));
    const n = await conn.read(buffer);
    const request = new TextDecoder().decode(buffer.subarray(0, n || 0));
    let response = Deno.env.get("FAKEFLAG") + "\n";
    if (request.trim() === "GIVE_ME_FLAG") {
        response = Deno.env.get("FLAG") + "\n";
    }
    await conn.write(new TextEncoder().encode(response));
    conn.close();
}

while (true) {
    const conn = await listener.accept();
    handleConnection(conn);
}
