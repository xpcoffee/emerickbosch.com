import React from "react"

export type HeadingData = {
  value: string
  depth: number
}

type HeadingTreeNode = {
  parent?: HeadingTreeNode
  value: string
  children: HeadingTreeNode[]
}

export type RootHeadingGroupComponent = React.FC
export type HeadingGroupComponent = React.FC
export type HeadingComponent = React.FC<{
  heading: string
  href: string
}>

type HeadingViewComponents = {
  Heading: HeadingComponent
  HeadingGroup?: HeadingGroupComponent
  RootHeadingGroup?: RootHeadingGroupComponent
}

export function renderHeadings({
  headings,
  Heading,
  HeadingGroup = DefaultHeadingGroup,
  RootHeadingGroup = DefaultHeadingGroup,
}: {
  headings: HeadingData[]
} & HeadingViewComponents) {
  const treeRoot = buildHeadingTree(headings)
  console.log({ treeRoot })
  return renderHeadingTree({
    node: treeRoot,
    Heading,
    HeadingGroup,
    RootHeadingGroup,
  })
}

function renderHeadingTree({
  node,
  Heading,
  HeadingGroup = DefaultHeadingGroup,
  RootHeadingGroup = DefaultHeadingGroup,
}: {
  node: HeadingTreeNode
} & HeadingViewComponents): JSX.Element {
  const { value, parent, children } = node
  const childElements = children.map(child =>
    renderHeadingTree({ node: child, Heading, HeadingGroup, RootHeadingGroup })
  )

  if (parent === undefined) {
    return <RootHeadingGroup>{childElements}</RootHeadingGroup>
  }

  const subGroup = childElements.length ? (
    <HeadingGroup>{childElements}</HeadingGroup>
  ) : undefined

  return (
    <Heading heading={value} href={getHeadingLink(value)}>
      {subGroup}
    </Heading>
  )
}

function buildHeadingTree(headings: HeadingData[]): HeadingTreeNode {
  let currentDepth = 0

  const rootNode: HeadingTreeNode = {
    value: "rootNode",
    children: [],
  }

  let currentNode = rootNode

  for (let heading of headings) {
    const newNode: HeadingTreeNode = {
      value: heading.value,
      children: [],
    }

    if (heading.depth < currentDepth) {
      newNode.parent = currentNode.parent?.parent ?? rootNode
    } else if (heading.depth > currentDepth) {
      newNode.parent = currentNode
    } else {
      newNode.parent = currentNode.parent
    }
    newNode.parent?.children.push(newNode)

    currentNode = newNode
    currentDepth = heading.depth
  }

  return rootNode
}

/**
 * Returns an href that will navigate to a given header
 *
 * IMPORTANT NOTE: this is reliant on the behaviour of the gatsby-remark-autolink-headers plugin
 */
function getHeadingLink(heading: string) {
  const snakeCaseHeading = heading
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w\s-]|_/g, "")

  return `#${snakeCaseHeading}`
}

const DefaultHeadingGroup: React.FC = ({ children }) => <ul>{children}</ul>