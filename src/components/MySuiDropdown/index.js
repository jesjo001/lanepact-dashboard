import { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import SuiButton from "components/SuiButton";

export default function MySuiDropdown({openMenu, handleCloseMenu, handleOpenMenu}) {
//   const [openMenu, setOpenMenu] = useState(null);
//   const handleOpenMenu = ({ currentTarget }) => setOpenMenu(currentTarget);
//   const handleCloseMenu = () => setCloseMenu(null);

  return (
    <>
      <SuiButton buttonColor="secondary" onClick={handleOpenMenu} style={{ width: "100%"}}>
        dropdown button
        <Icon className="material-icons-round font-bold">keyboard_arrow_down</Icon>
      </SuiButton>
      <Menu
        anchorEl={openMenu}
        getContentAnchorEl={null}
        transformOrigin={{ vertical: "top" , horizontal: "left" }}
        open={Boolean(openMenu)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>Pause</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Stop</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Schedule</MenuItem>
      </Menu>
    </>
  );
}