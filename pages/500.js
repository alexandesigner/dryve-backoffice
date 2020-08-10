import React from 'react'

import Container from '@material-ui/core/Container'
import NotFound from 'components/ui/NotFound'

function Custom404() {
  return (
    <Container>
      <NotFound
        title="Algum problema remoto"
        description="Tente continuar novamente do início"
        button={{ title: 'Voltar ao início', href: '/' }}
      />
    </Container>
  )
}

export default Custom404
