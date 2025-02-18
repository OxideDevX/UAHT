import {Row, Button, Input, Radio, Text} from '@nextui-org/react';
import {Info} from '@space/components/Info';
import {RESOURCES} from './constants';
import {createCode} from './helpers';
import {IO, RequestButton, Tips, SignText, Address} from './common';
import styles from './wallet.module.scss';

export const Ex = ({
  action,
  balance,
  resource,
  setResource,
  reserve,
  MM,
  signature,
  code,
  validateCode,
  amount,
  setAmount,
  onAmountChange,
  priority,
  setPriority,
  stamp,
  sign,
}: any) => {
  return (
    <IO
      action={action}
      balance={balance}
      Group={
        <Radio.Group
          className={styles.radio}
          label="Обери джерело:"
          orientation="horizontal"
          size="sm"
          value={resource}
          onChange={value => setResource(value)}
        >
          {Object.keys(RESOURCES).map((key: string) => (
            <Radio
              key={key}
              value={key}
              description={reserve ? <span title={`Резерв ${key}`}>{reserve[key]}</span> : '-'}
            >
              {RESOURCES[key]?.text}
            </Radio>
          ))}
        </Radio.Group>
      }
      I={
        <div>
          <Row className={styles.mv1} align="center">
            <Input
              aria-label="code"
              underlined
              disabled={!resource}
              color="secondary"
              placeholder={`${RESOURCES[resource]?.text || ''} Код UAH`}
              width="200px"
              value={code}
              onChange={e => validateCode(e?.target?.value)}
            />
            <Info link={RESOURCES[resource]?.help} className={styles.ml1} />
          </Row>
          <Row align="center" className={styles.mt05}>
            <RequestButton disabled={!resource || !code} />
            {resource && code ? (
              <>
                <Address
                  className={styles.ml1}
                  account={createCode({
                    priority,
                    stamp,
                    type: 'i',
                    source: resource,
                    value: code,
                    account: MM.account,
                  })}
                />
                <Info
                  text="Скопіюй та відправ код запиту для поповнення 🤝"
                  className={styles.ml1}
                />
              </>
            ) : null}
          </Row>
        </div>
      }
      O={
        <div>
          <Row className={styles.mv1} align="center">
            <Input
              aria-label="sum"
              underlined
              color="secondary"
              type="number"
              placeholder="Сума"
              width="200px"
              disabled={!!signature}
              value={amount}
              onChange={e => {
                setAmount(e?.target?.value);
              }}
              onBlur={() => onAmountChange(amount)}
            />
            <Tips {...{priority, setPriority, amount, disabled: !!signature}} />
            <Button
              className={styles.button}
              size="sm"
              auto
              disabled={!resource || !!signature || amount > reserve[resource]}
              onClick={() =>
                sign(
                  createCode({
                    priority,
                    stamp,
                    type: 'o',
                    source: resource,
                    value: amount?.toString(),
                    account: MM.account,
                    encode: false,
                  })
                )
              }
            >
              <SignText />
            </Button>
          </Row>
          <Row align="center" className={styles.mt05}>
            <RequestButton disabled={!resource || !signature} />
            {resource && signature ? (
              <>
                <Address
                  className={styles.ml1}
                  account={createCode({
                    priority,
                    stamp,
                    type: 'o',
                    source: resource,
                    value: amount?.toString(),
                    account: MM.account,
                    signature,
                  })}
                />
                <Info text="Скопіюй та відправ код запиту для виводу 🤝" className={styles.ml1} />
              </>
            ) : null}
          </Row>
          <div>
            <Text small color="grey">
              💸 Обробка по черзі за наявністю обраного резерву
            </Text>
          </div>
        </div>
      }
    />
  );
};
