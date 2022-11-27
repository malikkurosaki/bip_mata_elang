-- Active: 1667323247137@@127.0.0.1@3306@bip

select
    DAYNAME(G.`createdAt`) as day,
    K.name,
    COUNT(G.id) as value,
    K.idx
FROM `Keyword` as K
    JOIN `GoogleNews` as G ON K.id = G.`keywordId`
GROUP BY
     K.name
ORDER BY K.idx
