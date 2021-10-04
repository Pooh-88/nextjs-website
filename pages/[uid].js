import React from 'react'

// Project components
import DefaultLayout from 'layouts'
import { Header, SliceZone } from 'components'

// Project functions & styles
import { queryRepeatableDocuments } from 'utils/queries'
import useUpdatePreviewRef from 'utils/useUpdatePreviewRef';
import { Client } from 'utils/prismicHelpers'

/**
 * Page component
 */
const Page = ({ doc, menu, previewRef }) => {

  useUpdatePreviewRef(previewRef, doc.id)

  if (doc && doc.data) {
    return (
      <DefaultLayout>
        <div className="page">
          <Header menu={menu} />
          <SliceZone sliceZone={doc.data.page_content} />
        </div>
      </DefaultLayout>
    )
  }

  // Call the standard error page if the document was not found
  return null;
}


export async function getStaticProps({ params, previewData }) {
  const previewRef = previewData ? previewData.ref : null
  const refOption = previewRef ? { ref: previewRef } : null

  const doc = await Client().getByUID('page', params.uid, refOption) || {}
  const menu = await Client().getSingle('menu', refOption) || {}
  
  return {
    props: {
      previewRef,
      menu,
      doc
    }
  }
};

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments((doc) => doc.type === 'page')
  return {
    paths: documents.map(doc => `/${doc.uid}`),
    fallback: true,
  }
}

export default Page
