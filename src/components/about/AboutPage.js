import React from 'react';


class AboutPage extends React.Component {
    render(){
        return (
            <div id="aboutPage" className="jumbotron">
                <div className="container">
                    
                    <div className="row">
                        <div className="col-sm-2"/>
                        <div className="col-sm-8">  
                        <h1 className="text-center">About</h1>
                            <h5> PulseCheck is modern healthcare credentialing borne from the need for today’s healthcare providers to adapt to the changing demands of how people 
                                find work.  PulseCheck is built to exceed the rigorous needs of the highest demanding providers who understand there can be absolutely no compromise 
                                on speed or quality, regardless of scale. By coupling powerful, easy-to-use software, along with high-touch consultative support, 
                                PulseCheck helps healthcare providers remove friction from the candidate journey, resulting in faster placements and a more positive experience for
                                 both administration and candidates.
                            </h5>
                            
                            </div>
                        <div className="col-sm-2"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutPage;