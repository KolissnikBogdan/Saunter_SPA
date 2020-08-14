import React, { useState } from "react";
import { GoogleApiWrapper, Map, Marker, Polyline } from "google-maps-react";

const MapContainer = (props) => {
    const [state, setState] = useState({ markers: [] });

    const mapClicked = (mapProps, map, clickEvent) => {
        const newMarker = {
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng()
        }

        const { markers } = state;
        markers.push(newMarker);
        setState({ markers: markers });
        props.onMapChange(markers);
    }

    let markers = null;

    if(props.onlyView) {
        markers = props.route;
    } else {
        markers = state.markers;
    }

    const propsCnStyle = props.containerStyle;

    return (
        <Map
            containerStyle={propsCnStyle}
            google={props.google}
            initialCenter={{ lat: 49.453115, lng: 32.045652 }}
            zoom={14}
            style={{width: '100%', height: '100%'}}
            onClick={!props.onlyView && mapClicked}>

            {markers && markers.map(el => <Marker key={el.lat + el.lng} position={el} />)}
            {markers && markers.map((value, index, array) => {
                if (index) {
                    return (
                        <Polyline
                            key={value.lat + value.lng}
                            path={[value, array[index - 1]]}
                            strokeColor="#FF0000"
                            strokeOpacity={0.8}
                        />
                    )
                } else {
                    return null;
                }
            })}
        </Map>
    )
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCSnZh4D_rLPyato0wJ79ch-vdxslft4CI'),
    libraries: ['geometry']
})(MapContainer)