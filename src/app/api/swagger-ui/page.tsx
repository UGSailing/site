import 'swagger-ui-react/swagger-ui.css'
import ReactSwaggerUI from 'swagger-ui-react'

export default async function SwaggerUI() {
    return <ReactSwaggerUI url='openapi.json' />;
}
