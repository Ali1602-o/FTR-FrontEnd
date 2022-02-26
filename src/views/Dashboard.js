
import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";

import wLevelIcon from "assets/img/waterlevel_ic.png";
import wFlowIcon from "assets/img/waterflow_ic.png";
import greenDot from "assets/img/greenCircle.png";
import yellowDot from "assets/img/yellowCircle.png";
import redDot from "assets/img/redCircle.png";
import bg from "assets/img/river background.jpg";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import GaugeChart from 'react-gauge-chart';
import react from "react";
class Dashboard extends react.Component {

  state = {
    loading: true,
    color:'green',
    waterLevelData: [],
    waterFlowData: []
  }

  componentDidMount() {
   
      fetch("https://api.thingspeak.com/channels/1602992/fields/1.json?api_key=XWR0IS30KYXH9ZZ8&results=1")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                waterLevelData: json
            });
      })

    
      fetch("https://api.thingspeak.com/channels/1602993/fields/2.json?api_key=ON520M6JZRPI7LUA&results=1")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                waterFlowData: json,
                loading: false
            });
      })
      
  }

  componentWillUnmount() {
    this.setState({
      statistics: [],
      global: {},
      waterLevelData: [],
      waterFlowData: [],
      loading: true
    })
  }
  render(){
    return (
      
        <div className="content">
          <h4>Location : Oued Massa 1</h4>
          <Row >
            <Col lg="6" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row> 
                  <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Oued Massa</p>
                        <CardTitle tag="p">Sensors Data</CardTitle>
                        <p />
                      </div>
                    </Col>
                    
                  </Row>
                  <hr/>
                  <Row> 
                    <Col md="4" xs="5">
                      <div className="sensors_data">
                        <div className="water_level">
                          <img src={wLevelIcon}/><div class="blob"></div>
                        </div>
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="sensors_data">
                        <div className="water_level_desc">
                          
                          <h6>Water Level : </h6>
                        </div>
                        
                        {this.state.loading ? <h1>...</h1> :
                          this.state.waterLevelData.feeds.map((item) => (<div>
                          
                          <span className="sensor_value">{item.field1} Km</span>
                        </div>
                        ))}
                      </div>
                    </Col>
                  </Row>
                  <Row> 
                    <Col md="4" xs="5">
                      <div className="sensors_data">
                      <div className="water_flow">
                          <img src={wFlowIcon}/><div class="blob"></div>
                        </div>
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="sensors_data">
                        <div className="water_flow_desc">
                          <h6>Water Flow Speed :</h6>
                        </div>
                        <div>

                        {this.state.loading ? <h1>...</h1> :
                          this.state.waterFlowData.feeds.map((item) => (<div>
                          <span className="sensor_value">{item.field2} m/s</span>
                        </div>
                        ))}
                        </div>
                        
                      </div>
                    </Col>
                  </Row>      
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                  <i className="nc-icon nc-alert-circle-i" /> This section representes the two values of both, water level sensor (Ultrasonic Sensor)
                  and water flow sensor (Speed of the water flow).<br/>
                  <i className="nc-icon nc-alert-circle-i" /> These values change in real time.
                  </div>
                </CardFooter>
              </Card>
            </Col>




            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    
                    <Col md="12" xs="7">
                    <div id="container">
                      <div id="glass">
                      <div className="numbers">
                        <p className="card-category">Sensor</p>
                        <CardTitle tag="p">Ultrasonic Sensor</CardTitle>
                        <p />
                      </div>
                      </div>
                    </div>
                    </Col>
                  </Row>
                  <Row>
                    
                    <Col md="12" xs="11">
                      <br/><br/>
                      <div id="container">
                        <GaugeChart id="gauge-chart5"
                            nrOfLevels={420}
                            arcsLength={[0.3, 0.2, 0.5]}
                            colors={['#52c458', '#F5CD19', '#EA4228']}
                            percent={this.state.loading ? 0.0 :
                              this.state.waterLevelData.feeds.map((item) => (
                              item.field1
                            ))}
                            arcPadding={0.02}
                            textColor="#000000"
                            needleColor="grey"
                        />
                      </div>
                      <br/><br/>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <img src={greenDot}/> Water level is normal<br/>
                    <img src={yellowDot}/> Water level somewhat normal<br/>
                    <img src={redDot}/> Water level is critical
                  </div>
                </CardFooter>
              </Card>
            </Col>





            <Col lg="3" md="7" sm="6">
              <Card className="card-stats">
                <CardBody>
                <Row>
                    
                    <Col md="12" xs="7">
                    <div id="container">
                      <div id="glass">
                      <div className="numbers">
                        <p className="card-category">Sensor</p>
                        <CardTitle tag="p">Water Flow Sensor</CardTitle>
                        <p />
                      </div>
                      </div>
                    </div>
                    </Col>
                  </Row>
                  <Row>
                    
                    <Col md="12" xs="11">
                      <br/><br/>
                      <div id="container">
                        <GaugeChart id="gauge-chart5"
                            nrOfLevels={420}
                            arcsLength={[0.3, 0.2, 0.5]}
                            colors={['#52c458', '#F5CD19', '#EA4228']}
                            percent={this.state.loading ? 0.0 :
                              this.state.waterFlowData.feeds.map((item) => (
                              item.field2/10
                            ))}
                            arcPadding={0.02}
                            textColor="#000000"
                            needleColor="grey"
                        />
                      </div>
                      <br/><br/>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <img src={greenDot}/> Water Flow speed is low<br/>
                    <img src={yellowDot}/> Water Flow speed is medium<br/>
                    <img src={redDot}/> Water Flow speed is high
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          <Row>
            
            <Col lg="12" md="7" sm="6">
              <Card className="card-stats">
                <CardBody>
                <Row>
                    
                    <Col md="12" xs="7">
                    <div id="container">
                      <div id="glass">
                      <div className="numbers">
                        <p className="card-category">Danger</p>
                        <CardTitle tag="p">Status</CardTitle>
                        <p />
                      </div>
                      </div>
                    </div>
                    </Col>
                  </Row>
                 
                    <Row>
                      <Col md="12" xs="7">
                        <div class="blobRed">Warning : Sensors data are not normal</div>
                        <br/><br/>
                      </Col>
                    </Row>
                      
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/*
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Users Behavior</CardTitle>
                  <p className="card-category">24 Hours performance</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Updated 3 minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Email Statistics</CardTitle>
                  <p className="card-category">Last Campaign Performance</p>
                </CardHeader>
                <CardBody style={{ height: "266px" }}>
                  <Pie
                    data={dashboardEmailStatisticsChart.data}
                    options={dashboardEmailStatisticsChart.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-primary" /> Opened{" "}
                    <i className="fa fa-circle text-warning" /> Read{" "}
                    <i className="fa fa-circle text-danger" /> Deleted{" "}
                    <i className="fa fa-circle text-gray" /> Unopened
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" /> Number of emails sent
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                  <p className="card-category">Line Chart with Points</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboardNASDAQChart.data}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                    <i className="fa fa-circle text-warning" /> BMW 5 Series
                  </div>
                  <hr />
                  <div className="card-stats">
                    <i className="fa fa-check" /> Data information certified
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>*/}
        </div>
    );
  
}
}

export default Dashboard;
