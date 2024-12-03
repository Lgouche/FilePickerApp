import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Función para seleccionar imagen o video
  const pickImageOrVideo = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setSelectedImage(result.uri);
      }
    } else {
      console.log('Permiso denegado para acceder a la galería');
    }
  };

  // Función para seleccionar archivo
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Permitir cualquier tipo de archivo
      });
      setSelectedFile(res);
    } catch (err) {
      console.log('Error al seleccionar archivo', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar Archivos</Text>

      {/* Botones para seleccionar archivos */}
      <Button title="Seleccionar Foto o Video" onPress={pickImageOrVideo} />
      <Button title="Seleccionar Archivo" onPress={pickFile} />

      {/* Mostrar archivo seleccionado */}
      {selectedFile && (
        <Text style={styles.text}>Archivo: {selectedFile.name}</Text>
      )}

      {/* Mostrar imagen o video seleccionado */}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} resizeMode="contain" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
