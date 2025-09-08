import React from 'react'
import { Row, Col } from 'reactstrap'
import BarChart from './components/BarChart'
import RadarChart from './components/RadarChart'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'


const Report = () => {
    return (
        <>
            <div className='page-content'>
                <div className="reports-header">
                    <h4 className="page-title">
                        <i className="mdi mdi-file-document-outline me-2"></i>
                        Reports
                    </h4>
                </div>
                
                <Row>
                    <Col xl={6} className="mb-4">
                        <div className="chart-card">
                            <BarChart />
                        </div>
                    </Col>
                    
                    <Col xl={6} className="mb-4">
                        <div className="chart-card">
                            <RadarChart />
                        </div>
                    </Col>
                    
                    <Col xl={6} className="mb-4">
                        <div className="chart-card">
                            <LineChart />
                        </div>
                    </Col>
                    
                    <Col xl={6} className="mb-4">
                        <div className="chart-card">
                            <PieChart />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Report