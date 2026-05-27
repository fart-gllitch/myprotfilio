export default async function handler(req, res) {
  const USER_ID = '1244463352793665616';
  try {
    const r = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
    const data = await r.json();
    if (data?.success && data?.data?.discord_user?.avatar) {
      const u = data.data.discord_user;
      const ext = u.avatar.startsWith('a_') ? 'gif' : 'png';
      const url = `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${ext}?size=512`;
      const img = await fetch(url);
      const buf = Buffer.from(await img.arrayBuffer());
      res.setHeader('Content-Type', img.headers.get('content-type') || 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300');
      res.status(200).send(buf);
      return;
    }
  } catch (e) {}
  res.redirect(302, 'https://cdn.discordapp.com/embed/avatars/0.png');
}
