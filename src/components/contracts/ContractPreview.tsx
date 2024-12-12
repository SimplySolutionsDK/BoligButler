import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  section: {
    marginBottom: 10
  },
  text: {
    fontSize: 12,
    marginBottom: 5
  }
});

interface ContractPreviewProps {
  data: any;
}

export const ContractPreview: React.FC<ContractPreviewProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Rental Agreement</Text>
        
        <View style={styles.section}>
          <Text style={styles.text}>This agreement is made on [DATE]</Text>
          <Text style={styles.text}>Between:</Text>
          <Text style={styles.text}>[LANDLORD NAME]</Text>
          <Text style={styles.text}>And:</Text>
          <Text style={styles.text}>[TENANT NAME]</Text>
        </View>

        {/* More contract content will be added based on template and form data */}
      </Page>
    </Document>
  );
};