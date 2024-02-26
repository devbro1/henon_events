import { FormComp, TextInputComp } from 'utils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FieldValues, useForm } from 'react-hook-form';
import { Styles } from './form.styles';
import DateTimePicker from '../utils/DateTimePicker/DateTimePicker.index';
import { RestAPI } from 'scripts/api';
import { APIPath, type_options } from 'data';
import { toast } from 'react-toastify';
import { SelectComp } from '../utils';

function AddEventComp() {
    const validationSchema = yup.object().shape({
        title: yup.string().required(),
        start_date: yup.string().required(),
        end_date: yup.string().required(),
        type: yup.string().required(),
    });

    const queryClient = useQueryClient();

    const { handleSubmit, control, reset, getValues, setError } = useForm<FieldValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: {},
    });

    const mutator = useMutation(
        {
            mutationFn: (data: any) => {
                return RestAPI.post(APIPath.events.index(), data);
            },
            onError: (error: any) => {
                _.forEach(error.response.data.errors, (value, key) => {
                    setError(key, {
                        message: RestAPI.getErrorMessage('', Object.keys(value)[0], Object.values(value)[0]),
                    });
                });
                toast(error.response.data.message || 'Something went wrong, please try again');
            },
            onSuccess: (data: any) => {
                toast('Event was created successfully');
            },
        },
    );

    return (<FormComp
        onSubmit={handleSubmit(() => {
            mutator.mutate(getValues());
        })}
        title="Add Event"
        className=""
        buttonTitle="Create"
    >
        <TextInputComp className={Styles.fields} name="title" control={control} type="text" title="Title" />
        <DateTimePicker className={Styles.fields} name="start_date" control={control} title="Start Date" showTime={false} outputFormat='YYYY-MM-DD' />
        <DateTimePicker className={Styles.fields} name="end_date" control={control} title="End Date" showTime={false} outputFormat='YYYY-MM-DD' />
        <SelectComp className={Styles.fields} name="type" control={control} type="text" title="Type" options={type_options}/>

    </FormComp>);
}

export default AddEventComp;