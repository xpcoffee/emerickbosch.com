import { StaticImage } from "gatsby-plugin-image"
import React, { useMemo } from "react"
import { Layout } from "../components"

const AboutPage = () => {
  const showSnek = useMemo(() => Math.random() > 0.5, [])
  const image = useMemo(() => {
    return showSnek ? (
      <StaticImage
        alt="a snek"
        className="my-5 rounded-3xl"
        height={150}
        width={150}
        src="../images/angry-snek.jpg"
      />
    ) : (
      <StaticImage
        alt="picture of Emerick Bosch"
        className="my-5 rounded-3xl"
        height={150}
        width={150}
        src="../images/emerick-bosch.jpg"
      />
    )
  }, [showSnek])

  return (
    <Layout>
      <div className="flex justify-center text-center">
        <div style={{ maxWidth: "800px" }} className="w-9/12">
          <h2>Hi, there! 👋</h2>
          <div className="flex justify-center">{image}</div>
          <p>I am Emerick; you can also call me Rick.</p>
          <p>
            I build software systems. I strive to build them such that they have
            a positive impact on those who use them, and to build them
            sustainably alongside excellent people.
          </p>
          <br />
          <p className="text-xs">I am currently based in het Netherlands 🇳🇱</p>
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage
