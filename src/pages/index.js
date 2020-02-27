import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"

const IndexPage = ({ data }) => {
  const { solutionsYaml } = data
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <h2>Overview</h2>
      <MDXRenderer>{solutionsYaml.overviewSection}</MDXRenderer>
      <h2>Faq</h2>
      <h3>Overview</h3>
      <MDXRenderer>{solutionsYaml.faqSection.overview}</MDXRenderer>
      <h3>Blocks</h3>
      <ul>
        {solutionsYaml.faqSection.blocks.map(block => {
          return (
            <li>
              <h4>{block.title}</h4>
              <MDXRenderer>{block.copy}</MDXRenderer>
            </li>
          )
        })}
      </ul>

      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}

export default IndexPage

export const q = graphql`
  {
    solutionsYaml {
      overviewSection
      faqSection {
        overview
        blocks {
          title
          copy
        }
      }
    }
  }
`
