import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Solicitar permisos para la galería
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('Status de permisos:', status);  // Agregado para ver el estado del permiso
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitas conceder permiso para acceder a las fotos y videos.');
      }
    };

    requestPermissions();
  }, []);

  // Función para seleccionar imagen o video
  const pickImageOrVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Resultado de la selección:', result);  // Verificar todo el resultado
      if (!result.cancelled) {
        setSelectedImage(result.assets[0].uri);  // Aquí pasamos la URI correctamente
      } else {
        console.log('Selección cancelada');
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen o video:', error);
    }
  };

  // Función para seleccionar archivo
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Permitir cualquier tipo de archivo
      });
      console.log("Archivo seleccionado:", res);  // Verificar el resultado
      setSelectedFile(res);
    } catch (err) {
      console.error('Error al seleccionar archivo:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar Archivos</Text>

      {/* Botones para seleccionar archivos */}
      <Button
        title="Seleccionar Foto o Video"
        onPress={pickImageOrVideo}
        color="#F57C00" // Naranja oscuro
      />
      <Button
        title="Seleccionar Archivo"
        onPress={pickFile}
        color="#F57C00" // Naranja oscuro
      />

      {/* Mostrar archivo seleccionado */}
      {selectedFile && (
        <Text style={styles.text}>Archivo: {selectedFile.name}</Text>
      )}

      {/* Mostrar imagen o video seleccionado */}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} resizeMode="contain" />
      )}

      {/* Desplazamiento de archivos seleccionados */}
      <ScrollView style={styles.scrollContainer}>
        {selectedImage && (
          <View style={styles.fileContainer}>
            <Image source={{ uri: selectedImage }} style={styles.fileImage} />
            <Text style={styles.fileName}>Imagen seleccionada</Text>
          </View>
        )}
        {selectedFile && (
          <View style={styles.fileContainer}>
            <Text style={styles.fileName}>{selectedFile.name}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', // Cambiar a flex-start para que los elementos estén en la parte superior
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
  scrollContainer: {
    marginTop: 20,
    width: '100%',
    flex: 1,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  fileImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  fileName: {
    fontSize: 16,
    color: '#333',
  },
});
