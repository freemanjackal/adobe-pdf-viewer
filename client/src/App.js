import React from 'react';
import './App.css';
import { Box, Avatar, Stack, Label, SegmentedControl, Text, Switch } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import TabE from './components/Tab';
import CustomModal from './components/CustomModal';
import ViewSDKClient from './components/adobe';
import {MarkGithubIcon} from '@primer/octicons-react';

const MODES = ["", "IN_LINE", "SIZED_CONTAINER"];
const CONFIG = {"": "config_full", "IN_LINE": "config_inline", "SIZED_CONTAINER": "config_sized"};
const DEFAULT_VIEW_MODE = ["", "FIT_PAGE", "FIT_WIDTH"] ;

class App extends React.Component{

  constructor() {
    super();
    this.myRef = React.createRef();
    this.fileP = undefined;
    this.sdk = undefined;
    this.client_id = process.env.REACT_APP_CLIENT_ID;
    this.ga = process.env.REACT_APP_GA_TAG;
    this.state = {
      mode: "",
      activeDockIndex: 0,
      config_inline: {
        embedMode: MODES[1],
        dockPageControls: true,
        showLeftHandPanel: true,
        showDownloadPDF: true,
        showPrintPDF: true,
        showAnnotationTools: true,
        defaultViewMode:  DEFAULT_VIEW_MODE[1],
      },
      config_full: {
        showDownloadPDF: true,
        showPrintPDF: true,
        showAnnotationTools: true,
        dockPageControls: true,
        showLeftHandPanel: true,
        embedMode: MODES[0],
        defaultViewMode:  DEFAULT_VIEW_MODE[1],
      },
      config_sized: {
        embedMode: MODES[2],
        dockPageControls: true,
        showLeftHandPanel: true,
        showDownloadPDF: true,
        showPrintPDF: true,
        showAnnotationTools: true,
        defaultViewMode:  DEFAULT_VIEW_MODE[1],    

      },

    }
    
  }

  componentDidMount() {

      //this.myRef.current.focus();
      let viewerConfig = {
        showDownloadPDF: this.state.config_full.showDownloadPDF,
        showPrintPDF: this.state.config_full.showPrintPDF,
        showAnnotationTools: this.state.config_full.showAnnotationTools,
        dockPageControls: this.state.config_full.dockPageControls,
        showLeftHandPanel: this.state.config_full.showLeftHandPanel,
        defaultViewMode: "", /* Allowed possible values are "FIT_PAGE", "FIT_WIDTH" or "". */
        enableAnnotationAPIs: true,
    };
      if  (this.sdk === undefined){
        this.sdk = new ViewSDKClient();
      }    
     //this.fileP = this.sdk.previewFile('adobe-dc-view', viewerConfig, this.client_id)
      this.preview(this.state.mode, viewerConfig)

      
      

      this.sdk.ready().then(()=> {
        this.sdk.registerEventsHandler();
      })
  }



  handleDownload =  (e) =>{



    this.setState({
      [CONFIG[this.state.mode]]: {
        showDownloadPDF: !this.state[CONFIG[this.state.mode]].showDownloadPDF,
        showPrintPDF: this.state[CONFIG[this.state.mode]].showPrintPDF,
        showAnnotationTools: this.state[CONFIG[this.state.mode]].showAnnotationTools,
        dockPageControls: this.state[CONFIG[this.state.mode]].dockPageControls,
        showLeftHandPanel: this.state[CONFIG[this.state.mode]].showLeftHandPanel,
        defaultViewMode: this.state[CONFIG[this.state.mode]].defaultViewMode,
        embedMode: this.state[CONFIG[this.state.mode]].embedMode,
      }
    }, function(){
          let viewerConfig = this.state[CONFIG[this.state.mode]];

      this.preview(this.state.mode, viewerConfig);


    })
    
    /*this.fileP.then(adobeViewer => {
               adobeViewer.getAnnotationManager().then(annotationManager => {
                               annotationManager.setConfig(viewerConfig)
                                               .then(() => console.log("Success"))
                                               .catch(error => console.log(error));
               });
    });
    */

  }


  handlePrint = (e) =>{

    this.setState({
      [CONFIG[this.state.mode]]: {
        showDownloadPDF: this.state[CONFIG[this.state.mode]].showDownloadPDF,
        showPrintPDF: !this.state[CONFIG[this.state.mode]].showPrintPDF,
        showAnnotationTools: this.state[CONFIG[this.state.mode]].showAnnotationTools,
        dockPageControls: this.state[CONFIG[this.state.mode]].dockPageControls,
        showLeftHandPanel: this.state[CONFIG[this.state.mode]].showLeftHandPanel,
        defaultViewMode: this.state[CONFIG[this.state.mode]].defaultViewMode,
        embedMode: this.state[CONFIG[this.state.mode]].embedMode,
      }
    }, function(){

        let viewerConfig = this.state[CONFIG[this.state.mode]];
        this.preview(this.state.mode, viewerConfig);
    })

  }

handleAnnotationTools = (e) =>{
  

  this.setState({
      config_full: {
        showDownloadPDF: this.state.config_full.showDownloadPDF,
        showPrintPDF: this.state.config_full.showPrintPDF,
        showAnnotationTools: !this.state.config_full.showAnnotationTools,
        dockPageControls: this.state.config_full.dockPageControls,
        showLeftHandPanel: this.state.config_full.showLeftHandPanel,
        defaultViewMode: this.state.config_full.defaultViewMode,
        embedMode: this.state[CONFIG[this.state.mode]].embedMode,
      }
    }, function(){

            let viewerConfig = this.state.config_full;
            this.preview(this.state.mode, viewerConfig);
          });


  }

  handleLeftPanel = (e) =>{
    
    this.setState({
      [CONFIG[this.state.mode]]: {
        dockPageControls: this.state[CONFIG[this.state.mode]].dockPageControls,
        showLeftHandPanel: !this.state[CONFIG[this.state.mode]].showLeftHandPanel,
        embedMode: this.state[CONFIG[this.state.mode]].embedMode,
        showDownloadPDF: this.state[CONFIG[this.state.mode]].showDownloadPDF,
        showPrintPDF: this.state[CONFIG[this.state.mode]].showPrintPDF,
        showAnnotationTools: this.state[CONFIG[this.state.mode]].showAnnotationTools,
        defaultViewMode: this.state[CONFIG[this.state.mode]].defaultViewMode,
        }
    }, function(){

          let viewerConfig = this.state[CONFIG[this.state.mode]];
          this.preview(this.state.mode, viewerConfig);
      })


  }


handleDock = (e) =>{

    let activeIndex = 0;
    if (this.state.activeDockIndex === 0){
        activeIndex = 1;
    }
    this.setState({
      activeDockIndex: activeIndex,
      config_full: {
        dockPageControls: !this.state[CONFIG[this.state.mode]].dockPageControls,
        showLeftHandPanel: this.state[CONFIG[this.state.mode]].showLeftHandPanel,
        embedMode: this.state[CONFIG[this.state.mode]].embedMode,
        showDownloadPDF: this.state[CONFIG[this.state.mode]].showDownloadPDF,
        showPrintPDF: this.state[CONFIG[this.state.mode]].showPrintPDF,
        showAnnotationTools: this.state[CONFIG[this.state.mode]].showAnnotationTools,
        defaultViewMode: this.state[CONFIG[this.state.mode]].defaultViewMode
        
      }
    }, function(){

            let viewerConfig = this.state[CONFIG[this.state.mode]];
            this.preview(this.state.mode, viewerConfig);
            //this.sdk.previewFile(

                  /*
            
                  this.fileP.then(adobeViewer => {
                    adobeViewer.getAPIs().then(apis => {
                             // All viewer APIs can be invoked here
                             console.log(apis.showPrintPDF)

                     });
                  })

                   const customFlags = {
                                   showToolbar: false,
                                   showDownloadPDF: false,
                                   
                    }

                    this.fileP.then(adobeViewer => {
                      console.log(adobeViewer.executeCommand())
                         adobeViewer.executeCommand().then(executeCommandManager => {
                              console.log(executeCommandManager)
                         })
                                   adobeViewer.getAnnotationManager().then(annotationManager => {
                                                   annotationManager.setConfig(customFlags)
                                                                   .then(() => console.log("Success"))
                                                                   .catch(error => console.log(error));
                                   });
                    });
                    */

      })

  }


preview = (mode, config) => {
  
   document.getElementById("adobe-dc-view").style.height = "600px";

    if  (this.sdk === undefined){
        this.sdk = new ViewSDKClient();

    }

    /*this.fileP = sdk.previewFile('adobe-dc-view', {
                                                   enableAnnotationAPIs: true,
                                                  });

    this.fileP.then(adobeViewer => {
               adobeViewer.getAnnotationManager().then(annotationManager => {
                               annotationManager.setConfig(config)
                                               .then(() => console.log("Success"))
                                               .catch(error => console.log(error));
               });
});*/


    /*let view_config;
    if(mode === ""){
      view_config = {
        defaultViewMode: ""
      }
    }else{
      view_config = {
        embedMode: config.embedMode,
        defaultViewMode: config.defaultViewMode
      }

    }*/
    let config_value;
    if (config === ""){
      if (mode === ""){

          config_value = this.state.config_full
      }
      else if (mode === "IN_LINE") {
          config_value = this.state.config_inline
      }
      else{
          config_value = this.state.config_sized
      }
    }
    else{
        config_value = config;
    }

    
    this.setState({
      mode: mode
    })
    this.sdk.ready().then(()=> {
      this.sdk.previewFile('adobe-dc-view', config_value)
    })
}

  render(){
    const items = ['Dock', 'Undock'];
    const full = <Stack  gap={2}>
                        <Box display="flex">
                          <Box paddingX={2} flex="grow">
                            <Label  htmlFor="switchExample">
                              <Text>Download</Text>
                            </Label>
                          </Box>
                          <Switch
                            onChange={this.handleDownload}
                            id="switchExample"
                            switched={this.state.config_full.showDownloadPDF}
                          />
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Box paddingX={2} flex="grow">
                            <Label htmlFor="print">
                              <Text>Print</Text>
                            </Label>
                          </Box>
                          <Switch
                            onChange={this.handlePrint}
                            id="print"
                            switched={this.state.config_full.showPrintPDF}
                          />
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Box paddingX={2} flex="grow">
                            <Label htmlFor="annotations">
                              <Text>Annotation tools</Text>
                            </Label>
                          </Box>
                          <Switch
                            onChange={this.handleAnnotationTools}
                            id="annotations"
                            switched={this.state.config_full.showAnnotationTools}
                          />
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Box paddingX={2} flex="grow">
                            <Label htmlFor="left_pane">
                              <Text>Left Hand Pane</Text>
                            </Label>
                          </Box>
                          <Switch
                            onChange={this.handleLeftPanel}
                            id="left_pane"
                            switched={this.state.config_full.showLeftHandPanel}
                          />
                        </Box>
                        <SegmentedControl selectedItemIndex={this.state.activeDockIndex} onChange={this.handleDock} items={items} responsive />
              </Stack>

    const sized = <Stack  gap={2}>
                      <Box display="flex" alignItems="center">
                        <Box paddingX={2} flex="grow">
                          <Label htmlFor="controls">
                            <Text flex="grow">Download</Text>
                          </Label>
                        </Box>
                        <Switch
                          onChange={this.handleDownload}
                          id="controls"
                          switched={this.state.config_sized.showDownloadPDF}
                        />
                      </Box>
                        
                      <Box display="flex" alignItems="center">
                        <Box paddingX={2} flex="grow">
                          <Label htmlFor="left-pane">
                            <Text>Print</Text>
                          </Label>
                        </Box>
                        <Switch
                          onChange={this.handlePrint}
                          id="left-pane"
                          switched={this.state.config_sized.showPrintPDF}
                        />
                      </Box>
              </Stack>
    const inline = <Stack  gap={2}>
                      <Box display="flex" alignItems="center">
                        <Box paddingX={2} flex="grow">
                          <Label htmlFor="controls">
                            <Text>Download</Text>
                          </Label>
                        </Box>
                        <Switch
                          onChange={this.handleDownload}
                          id="controls"
                          switched={this.state.config_inline.showDownloadPDF}
                        />
                      </Box>
                        
                      <Box display="flex" alignItems="center">
                        <Box paddingX={2} flex="grow">
                          <Label htmlFor="left-pane">
                            <Text>Print</Text>
                          </Label>
                        </Box>
                        <Switch
                          onChange={this.handlePrint}
                          id="left-pane"
                          switched={this.state.config_inline.showPrintPDF}
                        />
                      </Box>
              </Stack>
    let option = full
    if (this.state.mode === "IN_LINE"){
      option = inline
    } else if(this.state.mode === "SIZED_CONTAINER"){
      option = sized
    }
  return (
    <>
    <Box flex="grow"
  alignItems="center"
  direction="row"
  display="flex"
  marginStart={-1}
  marginEnd={-1}
>
  <Box paddingX={1}>
    <Avatar name="Adobe viewer" size="md" />
  </Box>
  
  
  <Box paddingX={1}  flex="grow">
    <Text weight="bold">Adobe Pdf viewer</Text>
    <Text >SDK</Text>
  </Box>
  
  <TabE reff={this.myRef} preview={this.preview}/>

  <Box paddingX={1} >
    <a href="https://github.com/freemanjackal/adobe-pdf-viewer" className="github">
    <MarkGithubIcon size={24} />
    </a>
  </Box>
  
</Box>
<CustomModal>
        <div className="modal">
          <Box >
              {option}
          </Box>
          
        </div>
    </CustomModal>

</>
  );
}

}

export default App;

