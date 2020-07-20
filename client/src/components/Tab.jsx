import  React from 'react';
import { Box, Tabs } from 'gestalt';

const MODES = ["", "IN_LINE", "SIZED_CONTAINER"];
//const DEFAULT_VIEW_MODE = ["", "FIT_PAGE", "FIT_WIDTH"] ;

class TabE extends React.Component{
  constructor() {
    super();
    this.state = {
      
      activeIndex: 0,
      wrap: false,
    };
    
  }

  componentDidMount() {
    //this.preview(this.state.mode, this.state.config);
    //this.props.reff.current.focus();
  }



handleChange = ({ activeTabIndex, event }) => {
    event.preventDefault();
    this.setState({
      activeIndex: activeTabIndex
    })

    
    this.props.preview(MODES[activeTabIndex], "");
  };

  render(){

    const TABS = [
    { href:"", text: "Full mode" },
    { href:"", text: "Inline mode" },
    { href:"", text: "Sized mode" },
    
  ];
    return ( <Box >
            <Box  overflow="auto" borderSize="sm" padding={1}>
              <Tabs
                activeTabIndex={this.state.activeIndex}
                onChange={this.handleChange}
                tabs={TABS}
                wrap={this.state.wrap}

              />
            </Box>
          </Box>
          );
  }
}



export default TabE;