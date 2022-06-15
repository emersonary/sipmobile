import React, {Component} from 'react';

import {ScrollView, Text, StyleSheet, View} from 'react-native';

export default class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: props.selected >= 0 ? props.selected : -2,
    };
  }

  calctotais = () => {
    let totais = [];
    let current = 0;

    this.props.data.data.items.map((row, rowindex) => {
      current = 0;

      row.row.map((col, colindex) => {
        if (typeof col === 'number') {
          current = col;
        }

        if (totais.length - 1 < colindex) {
          totais.push(0);
        }

        totais[colindex] += current;
      });
    });

    return totais;
  };

  handleSelectLive = index => {
    if (this.state.selectedIndex != -2) {
      this.setState({selectedIndex: index});
      this.props.onPress(index);
    }
  };

  ColsContent = (level, rows, Totais) => {
    function numberWithCommas(n, c) {
      var parts = n.toFixed(c).split('.');
      return (
        parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        (parts[1] ? '.' + parts[1] : '')
      );
    }

    function formatcol(row, col, format, fullNumbers) {
      let result = col;

      if (result != -1) {
        switch (format.charAt(0)) {
          case 'K':
            if (!fullNumbers) {
              switch (true) {
                case col < 1000:
                  result = col.toFixed(0);
                  break;

                case col < 1000000:
                  result = (col / 1000).toFixed(1).replace('.', 'K');
                  break;

                default:
                  result = (col / 1000000).toFixed(1).replace('.', 'M');
                  break;
                  end;
              }
            } else {
              result = numberWithCommas(col);
            }
            break;

          case '%':
            const Total = Totais[format.charAt(1)];
            result =
              ((row.row[format.charAt(1)] / Total) * 100).toFixed(
                format.charAt(3),
              ) + '%';

            break;

          case 'N':
            if (format.charAt(1) == '%') {
              result = col.toFixed(format.charAt(2)) + '%';
            } else {
              result = col.toFixed(format.charAt(1));
            }

            break;

          case 'I':
            {
              result = col.toFixed(0);
            }

            break;
        }
      } else {
        result = '';
      }

      return result;
    }

    let {columns} = this.props.data;
    let {font} = this.props.data;

    return rows.items.map((row, index) => (
      <View>
        <View
          key={level + ';' + row.id}
          style={[
            styles.Row,
            {
              height: font ? font.size + 11 : 18,
              backgroundColor:
                level + ';' + row.id == this.state.selectedIndex
                  ? '#9995'
                  : '#0000',
            },
          ]}>
          {this.props.colors && (
            <View
              style={[
                styles.Image,
                {backgroundColor: this.props.colors[index % 16]},
              ]}>
              <Text numberOfLines={1} style={styles.textImage}>
                {index + 1}
              </Text>
            </View>
          )}

          {row.row.map((col, colindex) => (
            <View
              onPress={() => this.handleSelectLive(level + ';' + row.id)}
              key={colindex}
              style={[styles.RowCol, {flex: columns.items[colindex].flex}]}>
              <Text
                onPress={() => this.handleSelectLive(level + ';' + row.id)}
                numberOfLines={1}
                style={[
                  styles.textCol,
                  {
                    paddingLeft: colindex === 0 ? level * 10 : 0,
                    textAlign:
                      columns.items[colindex].format == 'S' ? 'left' : 'right',
                    fontWeight: row.style && row.style.bold ? 'bold' : 'normal',
                    color:
                      row.style && row.style.color ? row.style.color : '#FFF',
                    fontSize:
                      row.style && row.style.fontsize
                        ? row.style.fontsize
                        : font
                        ? font.size
                        : 11,
                  },
                ]}>
                {formatcol(
                  row,
                  col,
                  row.format
                    ? row.format[colindex]
                    : columns.items[colindex].format,
                  this.props.fullNumbers,
                )}
              </Text>
            </View>
          ))}
        </View>
        {row.listarow &&
          this.ColsContent(level + 1, row.listarow, this.calctotais())}
      </View>
    ));
  };

  HeaderContent = () => {
    return (
      <View style={styles.Header}>
        {this.props.colors && (
          <View style={styles.Image}>
            {this.props.data.tituloabreviacao != '' && (
              <Text numberOfLines={1} style={styles.textImage}>
                {this.props.data.tituloabreviacao}
              </Text>
            )}
          </View>
        )}
        {this.props.data.columns.items.map((column, index) => (
          <View
            key={index}
            style={[
              styles.HeaderCol,
              {flex: column.flex},
              {opacity: column.caption == '' ? 0 : 1},
            ]}>
            <Text
              numberOfLines={1}
              style={[
                styles.textHeader,
                {textAlign: column.format == 'S' ? 'left' : 'right'},
              ]}>
              {column.caption}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  render() {
    if (this.props.data) {
      return (
        <View style={styles.Table}>
          {!this.props.hideTitulo && (
            <View style={styles.Titulo}>
              <Text numberOfLines={1} style={styles.textTitulo}>
                {this.props.data.titulo}
              </Text>
            </View>
          )}
          {!this.props.hideHeader && this.HeaderContent()}

          <ScrollView style={{flex: 1}}>
            {this.ColsContent(0, this.props.data.data, this.calctotais())}
          </ScrollView>
        </View>
      );
    } else {
      return <View />;
    }
  }
}

const styles = StyleSheet.create({
  Table: {
    margin: 5,
    flex: 1,
    flexDirection: 'column',

    borderRadius: 3,
  },
  Titulo: {
    marginBottom: 3,
    borderRadius: 3,
    backgroundColor: 'rgba(44, 64, 86, 1)',
    alignItems: 'center',
  },

  textTitulo: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  textCol: {
    color: '#FFF',
    flex: 1,
  },
  HeaderCol: {
    margin: 1,
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: 'rgba(44, 64, 86, .5)',
    borderRadius: 3,
  },

  Row: {
    flexDirection: 'row',
    height: 20,
  },
  RowCol: {
    paddingLeft: 3,
    paddingRight: 3,
  },
  Header: {
    margin: 1,
    flexDirection: 'row',
  },

  textHeader: {
    color: '#999',
    fontWeight: 'bold',
    fontSize: 12,
  },

  Image: {
    width: 24,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginTop: 1,
    marginBottom: 1,
  },
  textImage: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
