import {useEffect, useState} from 'react';

const useForm = (callback, validate) => {
    const [state, setState] = useState({
        title: '',
        sDescript: '',
        fDescript: '',
        pathLength: '',
        route: []
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [mapRoutes, setMapRoutes] = useState([]);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.id]: e.target.value
        })
    }

    const handleMapChange = (markers) => {
        setState({
            ...state,
            route: markers
        })
    }

    useEffect(() => {
        setMapRoutes(state.route);
    },[state, mapRoutes])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(state));
        setIsSubmitting(true);
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    return {
        handleChange,
        handleMapChange,
        handleSubmit,
        state,
        errors
    }
}

export default useForm;