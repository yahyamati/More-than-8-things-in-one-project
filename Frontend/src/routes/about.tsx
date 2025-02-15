import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about' as never)({
  component: About,
})

function About() {
 
  return <div>I'm in about</div>
}