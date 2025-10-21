# Commands

## Create Product

```bash
stripe products create \
  --name "Premium" \
  --description "Premium resume services" \
  --tax-code txcd_10000000 \
  --default-price-data.currency usd \
  --default-price-data.unit-amount 1500 \
  --default-price-data.tax-behavior unspecified
```

## Get Product

```bash
stripe products retrieve <PRODUCT_ID> -e "default_price"
```

## Create Recurring Price

```bash
stripe prices create \
  --product <PRODUCT_ID> \
  --currency usd \
  --recurring.interval month \
  --recurring.interval-count 1 \
  --unit-amount 3000
```

## Create One Time Price

```bash
stripe prices create \
  --product <PRODUCT_ID> \
  --currency usd \
  --unit-amount 1500
```

## Print Pretty Product

```bash
stripe products list --active | jq '.data[] | {id, name, default_price}'
```
