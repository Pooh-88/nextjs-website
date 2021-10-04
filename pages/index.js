import React from 'react'

// Project components
import DefaultLayout from 'layouts'
import { Header, HomeBanner, SliceZone } from 'components'

// Project functions & styles
import { Client } from 'utils/prismicHelpers'
import useUpdatePreviewRef from 'utils/useUpdatePreviewRef'

/**
 * Homepage component
 */
const HomePage = ({ doc, menu, previewRef }) => {

  useUpdatePreviewRef(previewRef, doc.id)

  if (doc && doc.data) {
    return (
      <DefaultLayout>
        <div className='homepage'>
          <Header menu={menu} />
          <HomeBanner banner={doc.data.homepage_banner[0]} />
          <SliceZone sliceZone={doc.data.page_content} />
        </div>
      </DefaultLayout>
    )
  }

  // Call the standard error page if the document was not found
  return null
}

export async function getStaticProps({ previewData }) {

  const previewRef = previewData ? previewData.ref : null
  const refOption = previewRef ? { ref: previewRef } : null

  const doc = await Client().getSingle('homepage', refOption) || {}
  const menu = await Client().getSingle('menu', refOption) || {}

  return {
    props: {
      doc,
      menu,
      previewRef
    }
  }
}

export default HomePage
