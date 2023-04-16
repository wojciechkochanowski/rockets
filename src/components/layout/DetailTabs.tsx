import { useState } from "react"
import { Tabs, Tab, Box } from '@mui/material'
import StarDetails from "../views/StarDetails/StarDetails";
import Constellations from "../views/Constellations";

enum tabOpts {
  stars = 'stars',
  constellations = 'constellation'
}

interface TabPanelProps {
  children?: React.ReactNode;
  value: string;
}

export default function DetailTabs() {
  const [ selected, setSelected ] = useState<tabOpts>(tabOpts.stars)

  function TabPanel(props: TabPanelProps) {
    const { children, value } = props;
  
    return (value === selected) && (
      <Box component="div" sx={{ py: 3, px: 1.5 }}>
        {children}
      </Box>
    ) || null
  }

  const handleChange = (event: React.SyntheticEvent, value: tabOpts) => {
    setSelected(value);
  }

  return (
    <>
      <Box component="div" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs onChange={handleChange} value={selected}>
          <Tab label="Stars" value={tabOpts.stars} />
          <Tab label="Constellations" value={tabOpts.constellations} />
        </Tabs>
      </Box>
      <TabPanel value={tabOpts.stars}>
        <StarDetails/>
      </TabPanel>
      <TabPanel value={tabOpts.constellations}>
        <Constellations/>
      </TabPanel>
    </>
  )
}
