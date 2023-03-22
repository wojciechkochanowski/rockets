import { PropsWithChildren } from 'react'
import { styled } from '@mui/material/styles'

type InfoRowProps = PropsWithChildren<{ label: string }>

const DT = styled('dt')({
  fontWeight: 400
})

const DD = styled('dd')(({ theme }) => ({
  fontWeight: 300,
  marginLeft: 0,
  marginBottom: 5,
  paddingBottom: 5,
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: 0
  }
}))

export default function InfoRow({ label, children }: InfoRowProps) {
  return (
    <>
      <DT>{ label }</DT>
      <DD>{ children }</DD>
    </>
  )
}