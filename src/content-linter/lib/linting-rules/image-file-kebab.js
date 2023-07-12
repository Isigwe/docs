import { addError, forEachInlineChild } from 'markdownlint-rule-helpers'

export const imageFileKebab = {
  names: ['GHD004', 'image-file-kebab'],
  description: 'Image file names should always be lowercase kebab case',
  severity: 'warning',
  tags: ['accessibility', 'images'],
  function: function GHD005(params, onError) {
    forEachInlineChild(params, 'image', async function forToken(token) {
      const imageFileName = token.attrs[0][1].split('/').pop().split('.')[0]
      const nonKebabRegex = /([A-Z]|_)/
      if (imageFileName.match(nonKebabRegex)) {
        addError(
          onError,
          token.lineNumber,
          `The image file name: ${token.attrs[0][1]}, is not lowercase kebab case.`,
        )
      }
    })
  },
}
