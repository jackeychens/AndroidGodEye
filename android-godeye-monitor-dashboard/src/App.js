import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import AppInfo from "./appinfo/appInfo";
import {Row, Col, Clearfix, Grid, Panel, Label, PageHeader} from 'react-bootstrap'
import globalWs from './communication/websocket'
import BatteryInfo from "./batteryinfo/batteryInfo";
import Startup from "./startup/startup";
import Ram from "./ram/ram";
import Pss from "./pss/pss";
import Fps from "./fps/fps";
import Cpu from "./cpu/cpu";
import Heap from "./heap/heap";
import Pageload from "./pageload/pageload";
import Traffic from "./traffic/traffic";
import Crash from "./crash/crash";
import Block from "./block/block";
import Network from "./network/network";
import Thread from "./thread/thread";
import MemoryLeak from "./memoryleak/memoryLeak";

class App extends Component {

    constructor(props) {
        super(props);
        this._onReceiveMessage = this._onReceiveMessage.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        globalWs.setReceiveMessageCallback(this._onReceiveMessage);
        globalWs.start();
        setInterval(this.refresh, 2000);
    }

    refresh() {
        this._onReceiveMessage("fpsInfo", {
            currentFps: "12",
            systemFps: "34"
        });
        // this._onReceiveMessage("pageloadInfo", {
        //     pageId: "11",
        //     pageName: "ActivityA",
        //     pageStatus: "created",
        //     pageStatusTime: "2018-03-00"
        // })
        // this._onReceiveMessage("crashInfo", {
        //     timestampMillis: new Date().getMilliseconds(),
        //     throwableMessage: "throwableMessagethrowableMessagethrowableMessagethrowableMessagethrowableMessagethrowableMessagethrowableMessage",
        //     throwableStacktrace: ["1111", "1111", "1111", "1111", "1111", "1111", "1111", "1111", "1111", "1111"]
        // })
        // this._onReceiveMessage("blockInfo", {
        //     blockTime: 123,
        //     blockBaseinfo: {df: "sdf", vvv: "1312", bb: ["fewefwf", "fwewfe"]}
        // })
        // this._onReceiveMessage("networkInfo", {
        //     url: "http://www.baidu.com",
        //     endTimeMillis: 123,
        //     startTimeMillis: 120
        // })
        this._onReceiveMessage("leakInfo", {
            referenceKey: "referenceKey",
            leakTime: "leakTime",
            leakObjectName: "leakObjectName",
            statusSummary: "statusSummary",
            leakStack: ["leakStack", "leakStack", "leakStack", "leakStack", "leakStack"]
        })

        // this._onReceiveMessage("threadInfo", [
        //     {
        //         id: 1,
        //         name: "name",
        //         state: "state",
        //         deadlock: "deadlock",
        //         priority: "priority",
        //         deamon: "deamon",
        //         isAlive: "isAlive",
        //         isInterrupted: "isInterrupted",
        //     },
        //     {
        //         id: 1,
        //         name: "name",
        //         state: "state",
        //         deadlock: "deadlock",
        //         priority: "priority",
        //         deamon: "deamon",
        //         isAlive: "isAlive",
        //         isInterrupted: "isInterrupted",
        //     }, {
        //         id: 1,
        //         name: "name",
        //         state: "state",
        //         deadlock: "deadlock",
        //         priority: "priority",
        //         deamon: "deamon",
        //         isAlive: "isAlive",
        //         isInterrupted: "isInterrupted",
        //     }, {
        //         id: 1,
        //         name: "name",
        //         state: "state",
        //         deadlock: "deadlock",
        //         priority: "priority",
        //         deamon: "deamon",
        //         isAlive: "isAlive",
        //         isInterrupted: "isInterrupted",
        //     }
        // ]);
    }

    _onReceiveMessage(moduleName, payload) {
        if ("cpuInfo" === moduleName) {
            this.refs.cpuInfo.refresh(payload);
            return;
        }
        if ("heapInfo" === moduleName) {
            this.refs.heapInfo.refresh(payload);
            return;
        }
        if ("appInfo" === moduleName) {
            this.refs.appInfo.refresh(payload);
            return;
        }
        if ("batteryInfo" === moduleName) {
            this.refs.batteryInfo.refresh(payload);
            return;
        }
        if ("startupInfo" === moduleName) {
            this.refs.startupInfo.refresh(payload);
            return;
        }
        if ("ramInfo" === moduleName) {
            this.refs.ramInfo.refresh(payload);
            return;
        }
        if ("pssInfo" === moduleName) {
            this.refs.pssInfo.refresh(payload);
            return;
        }
        if ("fpsInfo" === moduleName) {
            this.refs.fpsInfo.refresh(payload);
            return;
        }
        if ("pageloadInfo" === moduleName) {
            this.refs.pageloadInfo.refresh(payload);
            return;
        }
        if ("trafficInfo" === moduleName) {
            this.refs.trafficInfo.refresh(payload);
            return;
        }
        if ("crashInfo" === moduleName) {
            this.refs.crashInfo.refresh(payload);
            return;
        }
        if ("blockInfo" === moduleName) {
            this.refs.blockInfo.refresh(payload);
            return;
        }
        if ("networkInfo" === moduleName) {
            this.refs.networkInfo.refresh(payload);
            return;
        }
        if ("threadInfo" === moduleName) {
            this.refs.threadInfo.refresh(payload);
            return;
        }
        if ("leakInfo" === moduleName) {
            this.refs.leakInfo.refresh(payload);
            return;
        }
    }

    render() {
        return (
            <div className="App">
                <Grid>
                    <Row>
                        <Col md={12}><AppInfo ref="appInfo"/></Col>
                    </Row>
                    <Row>
                        <Col md={4}> <BatteryInfo ref="batteryInfo"/>
                        </Col>
                        <Col md={5}> <Startup ref="startupInfo"/>
                        </Col>
                        <Col md={3}> <Fps ref="fpsInfo"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}> <Ram ref="ramInfo"/>
                        </Col>
                        <Col md={6}> <Pss ref="pssInfo"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}> <Cpu ref="cpuInfo"/>
                        </Col>
                        <Col md={6}> <Heap ref="heapInfo"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}><Traffic ref="trafficInfo"/></Col>
                        <Col md={6}><Crash ref="crashInfo"/></Col>
                    </Row>
                    <Row>
                        <Col md={12}><Pageload ref="pageloadInfo"/></Col>
                    </Row>
                    <Row>
                        <Col md={6}><Block ref="blockInfo"/></Col>
                        <Col md={6}><Network ref="networkInfo"/></Col>
                    </Row>
                    <Row>
                        <Col md={12}><Thread ref="threadInfo"/></Col>
                    </Row>
                    <Row>
                        <Col md={12}><MemoryLeak ref="leakInfo"/></Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;