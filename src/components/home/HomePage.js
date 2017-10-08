import React from 'react';
const howItWorks = require("../../public/images/howitworks.png"); 
const complianceEngine = require("../../public/images/complianceEngine.png");
const fb = require("../../public/images/fb.png");
const twitter = require("../../public/images/twitter.png");
const linkedin = require("../../public/images/linkedin.png");
const instagram = require("../../public/images/instagram.png");
const gplus = require("../../public/images/gplus.png");
const background = require("../../public/images/background.jpg");

class HomePage extends React.Component {
    render(){
        return (
            <div>      
                <div id="headline" className="container-fluid">
                    <div className="row text-center">
                        <h1>The safest way to </h1>
                        <h1>protect your patients</h1> 
                        <br/>
                        <p>Modern, compliant exclusion monitoring for healthcare companies</p> 
                    </div>
                </div>

                <div id="about" className="container-fluid">
                    <div className="row text-center">
                        <div className="col-sm-2"/>
                        <div className="col-sm-2 ">
                            <h3><b>Our Story</b></h3>
                            <h4>We are Silicon Valley based, Angel backed and have a team of data wranglers, software hackers, HR leaders, nurses and doctors. PulseCheck was built by people with experience from Google, Qlik, Dropbox and Kaiser Permanente.  Most important: we are patients, parents and kids so know the importance of a safe, well-run healthcare facility. 
                            </h4>
                        </div>
                        <div className="col-sm-1"/>
                        <div className="col-sm-2">
                        <h3><b>Our Vision</b></h3>
                            <h4>The current methods to monitor employees, protect patients and ensure compliance are fundamentally broken.   At PulseCheck we strive to modernize healthcare exclusion screening by simplifying the complex.    Healthcare companies should be focused on patient care, not monitoring data across 1700+ Federal and State exclusion lists, compliance reporting and audits.   
                            </h4>
                        </div>
                        <div className="col-sm-1"/>
                        <div className="col-sm-2">
                        <h3><b>Technology</b></h3>
                            <h4>PulseCheck is taking a software-first approach to solve the a complex data problem.  By using API&#39;s, analytics, Artificial Intelligence (AI) and Natural Language Processing (NLP), PulseCheck can return Exclusion reports faster, more frequent and more accurate than any of the traditional methods.  
                            </h4>
                        </div>
                        <div className="col-sm-2"/>
                    </div>
                </div>

                                
                <div id="simplify" className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3"/>
                        <div className="col-sm-3 text-center">
                            <img src={howItWorks} />
                        </div>
                        <div className="col-sm-3 text-center">
                            <h3><b>Simplifying Data</b></h3><br/>
                            <h4> PulseCheck&#39;s proprietary database pulls from OIG, SAM, OFAC and over 1700 other State and Federal sources. We are using data science and best practices in master data management no normalize complex, disparate datasets.  We are using techniques like Natural Language Processing to normalize millions of records that can then be intelligently blended with your healthcare worker employee data.
                            </h4>    
                        </div>
                        <div className="col-sm-3"/>
                    </div>
                </div>
                <div id="compliance" className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3"/>
                        <div className="col-sm-3 text-center">
                                <h3><b>Compliance Engine</b></h3><br/>
                                <h4>PulseCheck&#39;s compliance engine uses artificial intelligence (AI) to constantly develop business rules and filters to completely automate the process to identify exceptions, validate data and generate your exclusionary reports. Everything done on the platform can be extended via API&#39;s so you can develop your own apps, integrate into your internal system or 3rd party applicant tracking systems. 
                                    </h4>    
                        </div>
                        <div className="col-sm-3 text-center">
                            <img src={complianceEngine} />
                        </div>
                        <div className="col-sm-3"/>
                    </div>
                </div>


                    <div id="pricing" className="container-fluid">
                    <div className="text-center">
                        <h2>Solutions</h2>
                        <br/><br/>
                    </div>
                    <div className="row slideanim">
                        <div className="col-sm-4 col-xs-12">
                        <div className="panel panel-default text-center">
                            <div className="panel-heading">
                                <h3>Pulse Basic</h3>
                            </div>
                            <div className="panel-body">
                                <p>Office of Inspector General (OIG) </p>
                                    <p>System for Award Management (SAM)</p>
                                    <p>Office for Foreign Asset Control (OFAC)</p>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/><br/>
                            </div>
                            <div className="panel-footer">
                                <h4>$1 / user / month</h4>
                            </div>
                        </div>      
                        </div>     
                        <div className="col-sm-4 col-xs-12">
                        <div className="panel panel-default text-center">
                            <div className="panel-heading">
                            <h3>Pulse Basic plus</h3>
                            </div>
                            <div className="panel-body">
                                <p>DEA (Diversion Control List)</p>
                                <p>Food and Drug Administration (FDA)</p>
                                <p>Office of Research Integrity (ORI)</p>
                                <p>TRICARE</p>
                                <p>Medicare Opt-Out</p>
                                <br/><br/>
                                </div>
                                <div className="panel-footer">
                                <h4>$2.49 / user / month</h4>
                            </div>
                        </div>      
                        </div>       
                        <div className="col-sm-4 col-xs-12">
                        <div className="panel panel-default text-center">
                            <div className="panel-heading">
                            <h3>Pulse Premier</h3>
                            </div>
                            <div className="panel-body">
                                <p>Pulse Advanced plus </p>
                                <p>State Medicaid sanctions</p>
                                <p>42 HEAT sources</p>
                                <p>51 AG Notice and Release sources </p>
                                <p>State level procurement/contractor debarment sources. </p>
                                <p>Sanctioning boards from all 56 U.S. jurisdictions across all provider types.</p>
                            </div>
                            <div className="panel-footer">
                            <h4>Inquire Below</h4>
                            </div>
                        </div>      
                        </div>    
                    </div>
                    </div>


                    <div id="contactform" className="container-fluid">
                        <h2 className="text-center">Request demo</h2>
                        <p className="text-center">To schedule a product demo or buy please fill in your contact details</p>
                        <br/> <br/>
                        <div className="row">
                            <div className="col-md-3"/>
                            <div className="col-md-2">
                                <p><span className="glyphicon glyphicon-map-marker"></span> San Jose, CA</p>
                                <p><span className="glyphicon glyphicon-phone"></span> Phone: +1 111 222 3333</p>
                                <p><span className="glyphicon glyphicon-envelope"></span> Email: info@pulsecheck.io</p>
                            </div>
                            <div className="col-md-3">
                                <div className="row">
                                    <div className="col-sm-6 form-group">
                                        <input className="form-control" id="name" name="name" placeholder="Name" type="text" required/>
                                    </div>
                                    <div className="col-sm-6 form-group">
                                        <input className="form-control" id="email" name="email" placeholder="Email" type="email" required/>
                                    </div>
                                </div>
                                <textarea className="form-control" id="comments" name="comments" placeholder="Comment" rows="5"></textarea>
                                <br/>
                                <div className="row">
                                    <div className="col-md-12 form-group">
                                        <button className="btn pull-right" type="submit">Send</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4"/>
                        </div>
                    </div>

                    <footer className="text-center">
                    <br/>
                        <a className="up-arrow" href="#" data-toggle="tooltip" title="TO TOP">
                            <span className="glyphicon glyphicon-chevron-up"></span>
                        </a><br/><br/>
                        <i className="fa fa-facebook fa-lg" ></i>  <i className="fa fa-google-plus fa-lg"></i> <i className="fa fa-instagram fa-lg"></i> <i className="fa fa-linkedin fa-lg"></i> <i className="fa fa-twitter fa-lg"></i>		
                        <br/>
                        <br/>
                        <p>&copy; 2017 by PulseCheck</p>
                        <br/>
                    </footer>

         </div>
        );
    }
}

export default HomePage;