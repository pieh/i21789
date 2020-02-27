exports.createSchemaCustomization = ({
  schema,
  actions,
  createContentDigest,
}) => {
  const { createTypes, createFieldExtension } = actions

  createFieldExtension({
    name: `mdx`,
    extend() {
      return {
        type: `String`,
        resolve(source, _, _2, info) {
          const value = source[info.fieldName]
          const mdxType = info.schema.getType(`Mdx`)
          const resolve = mdxType.getFields().body.resolve
          return resolve({
            rawBody: value,
            internal: {
              contentDigest: createContentDigest(value),
            },
          })
        },
      }
    },
  })

  createTypes(`
    type SolutionsYaml implements Node {
      overviewSection: String @mdx
      faqSection: SolutionsYamlFaqSection
    }

    type SolutionsYamlFaqSection {
      overview: String @mdx
      blocks: [SolutionsYamlFaqSectionBlocks]
    }

    type SolutionsYamlFaqSectionBlocks {
      # this is just a string, not markdown
      title: String
      copy: String @mdx
    }
  `)
}
