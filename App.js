import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [produto, setProduto] = useState('');
  const [estoque, setEstoque] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [venda, setVenda] = useState('');

  const adicionarProduto = () => {
    setProdutos([...produtos, { nome: produto, estoque: parseInt(estoque) }]);
    setProduto('');
    setEstoque('');
  };

  const venderProduto = () => {
    const novoEstoque = produtos.map((item) => {
      if (item.nome === venda && item.estoque > 0) {
        return { ...item, estoque: item.estoque - 1 };
      }
      return item;
    });
    setProdutos(novoEstoque);
    setVenda('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Controle de Vendas e Estoque</Text>

      <Text style={styles.subtitle}>Cadastrar Produto</Text>
      <TextInput
        placeholder="Nome do Produto"
        value={produto}
        onChangeText={setProduto}
        style={styles.input}
      />
      <TextInput
        placeholder="Estoque"
        keyboardType="numeric"
        value={estoque}
        onChangeText={setEstoque}
        style={styles.input}
      />
      <Button title="Adicionar Produto" onPress={adicionarProduto} />

      <Text style={styles.subtitle}>Realizar Venda</Text>
      <TextInput
        placeholder="Produto Vendido"
        value={venda}
        onChangeText={setVenda}
        style={styles.input}
      />
      <Button title="Vender" onPress={venderProduto} />

      <Text style={styles.subtitle}>Estoque Atual</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <Text>{item.nome}: {item.estoque} unidades</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, paddingTop: 50,
  },
  title: {
    fontSize: 22, fontWeight: 'bold', marginBottom: 20,
  },
  subtitle: {
    marginTop: 20, fontSize: 18, fontWeight: 'bold',
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10,
  },
});
