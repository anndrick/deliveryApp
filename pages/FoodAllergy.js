import { View, Text, Button } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'
import {Formik} from 'formik'
import axios from 'axios'

export default function FoodAllergy() {
  return (
    <View className='bg-gray-900'>
      <Formik
        initialValues={{Alergy: '', Drug: '', EmergencyNumber: '', EmergencyContact: ''}}
        // onSubmit = {values => console.log(values)}
        onSubmit = {values => 
            axios.post('',{
                Alergy: values.Alergy,
                Drug: values.Drug,
                EmergencyNumber: values.EmergencyNumber,
                EmergencyContact: values.EmergencyContact,
            })
            .then(response => {console.log(response)})
            .catch(error => console.log('xd'))
        }
    >
        {({handleChange, handleBlur, handleSubmit, values}) => (
            <View>
                <Text className='text-white text-bold text-xl'>¿Tienes alguna alergia? Proporciónanos datos de seguridad en caso de ingesta</Text>
                <View>
                    <TextInput 
                        onChangeText= {handleChange('Alergy')}
                        onBlur = {handleBlur('Alergy')}
                        value = {values.Alergy}
                        label = 'Alergia'
                    />
                    <TextInput 
                        onChangeText= {handleChange('Drug')}
                        onBlur = {handleBlur('Drug')}
                        value = {values.Drug}
                        label = 'Medicamento para la alergia'
                    />
                    <TextInput 
                        onChangeText= {handleChange('EmergencyNumber')}
                        onBlur = {handleBlur('EmergencyNumber')}
                        value = {values.EmergencyNumber}
                        label = 'Número de emergencia'
                    />
                    <TextInput 
                        onChangeText= {handleChange('EmergencyContact')}
                        onBlur = {handleBlur('EmergencyContact')}
                        value = {values.EmergencyContact}
                        label = 'Nombre del contacto de emergencia'
                    />
                    <Button onPress={handleSubmit} title='Sumbit'/>
                </View>
                <Text className='text-white text-bold text-xl'>Gracias C:</Text>
            </View>
        )}
    </Formik>
    </View>
  )
}